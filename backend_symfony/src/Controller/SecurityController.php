<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Symfony\Component\HttpClient\HttpClient;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;

//////LOGS//////
// echo "<pre>";
//var_dump( $this->getUser()->getPassword());
// echo "</pre>";



class SecurityController extends AbstractController
{

    ///////////////////////////////////////LOGIN///////////////////////////////////////////
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils, Request $request, CsrfTokenManagerInterface $tokenManager): Response
    {
        
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();
        //recogemos el token para guardarlo en session
        $token = $tokenManager->getToken('authenticate')->getValue();
        //abrimos sesión
        $session = new Session();
        //no hacemos start, porque symfony ya lo realiza
        //$session->start();
        //guardamos el token
        $session->set('token', $token);
        //creamos el formulario
        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }


    ///////////////////////////////////////LOGOUT///////////////////////////////////////////
    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
    }


    ///////////////////////////////////////LOGOUT SUCCESS///////////////////////////////////////////
    /**
     * @Route("/logoutSuccess", name="app_logout_success")
     */
    public function logoutSuccess()
    {
        //al hacer logout borramos los datos del fichero temporal
        $filesystem = new Filesystem();
         $current_dir_path = getcwd();
         $new_file_path = $current_dir_path . "file.txt";
        $filesystem->dumpFile($new_file_path,'');

        return new JsonResponse([
            'response' => 'ok' 
        ]);
    }

    ////////////////////OBTIENE LOS DATOS DEL USUARIO GUARDADOS EN EL FICHERO TEMPORAL/////////////////////////
    /**
    * @Route("/userData", name="userData")
    */
    public function userData(): Response
    { 
        //leemos los datos del fichero
        $seccion = file_get_contents('../publicfile.txt');
        //los pasamos a array
        $array = explode(";" , $seccion);
     
        //los copiamos en el array de datos
        $data[] = [
            "email" => $array[0],
            "password" => $array[1],
            "token" => $array[2]
        ];

        // devolvemos los datos en forma de json
        return new JsonResponse([
            'user' => $data
        ]);
    }

    ////////////////////GUARDAMOS LOS DATOS EN UN FICHERO TEMPORAL/////////////////////////

    /**
    * @Route("/saveUserData", name="saveUserData")
    */
    public function saveUserData(): Response { //ESTE MÉTODO GUARDA LOS DATOS DEL USUARIO

        //guardamos los datos del login del usuario en un archivo
        $fsObject = new Filesystem();
        $current_dir_path = getcwd();
        //abrimos sesión para recuperar el token guardado anteriormente
        $session = new Session();

        //creamos el fichero y guardamos los datos
        try {
            $new_file_path = $current_dir_path . "file.txt";
         
                $fsObject->touch($new_file_path);
                $fsObject->chmod($new_file_path, 0777);
                $fsObject->dumpFile($new_file_path, $this->getUser()->getEmail().";".$this->getUser()->getPassword().";".$session->get('token'));
        } catch (IOExceptionInterface $exception) {
            echo "Error creating file at". $exception->getPath();
        }

        //hacemos un redirect al frontend que irá al método userData y recuperará los datos guardados en el fichero
        return new RedirectResponse('http://localhost:3001/successLogin');
    }

    /////////////////////////////////UPDATE USER///////////////////////////
    /**
    * @Route("/updateuser", name="update")
    */
    public function update(Request $request): Response
    {
        if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {

            ///////////recogemos los datos que nos envía el frontend (email)///////////////
            $data = json_decode($request->getContent(), true);
            $request->request->replace(is_array($data) ? $data : array());
            $newEmail = $request->request->get('email');
          
            ////////////obtenemos el usuario logueado/////////////////////////////////////
            $seccion = file_get_contents('../publicfile.txt');
            $array = explode(";", $seccion);

            $user = $this->getDoctrine()->getRepository(User::class)->findOneByEmail($array[0]);
            if (!$user) {
                throw $this->createNotFoundException(
                    'No user found'
                   
                );
            }

            //////////////////////actualizamos el usuario en la base de datos///////////////
            //actualizamos el email
            $user->setEmail($newEmail);
       
            //guardamos en bd
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return new Response('Updated email user with id '.$user->getId());
        }
    }
}
