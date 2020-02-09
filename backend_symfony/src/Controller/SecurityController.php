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

class SecurityController extends AbstractController
{

    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils, Request $request, CsrfTokenManagerInterface $tokenManager): Response
    {

        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        //recogemos el token para guardarlos en session
        $token = $tokenManager->getToken('authenticate')->getValue();

        //los guardamos en sesion
        $session = new Session();
        //no hacemos start, porque symfony ya lo realiza
        //$session->start();

        //guardamos los datos
        $session->set('token', $token);
        
        //creamos el formulario y el token
        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
    }

    /**
    * @Route("/userData", name="userData")
    */
    public function userData(): Response //ESTE MÉTODO LEE LOS DATOS DEL USUARIO QUE HA HECHO LOGIN, QUE ESTÁN GUARDADOS EN UN FICHERO TEMPORAL
    { 
        //////////////////GUARDAR DATOS EN SESIÓN////////////////////
        //abrimos sesión
        // $session = new Session();

        //obtenemos los datos
        // $data = $session->get('data');

        ///////////////////////////////////////////////////////////////


        //leemos los datos del fichero
        $seccion = file_get_contents('../publicfile.txt');
        //los pasamos a array
        $array = explode(";" , $seccion);
       // var_dump($array);

       
        //los copiamos en el array de datos
        $data[] = [
            "email" => $array[0],
            "password" => $array[1],
            "token" => $array[2]
        ];

        //borramos el fichero temporal
        // $filesystem = new Filesystem();
        // $current_dir_path = getcwd();
        // $new_file_path = $current_dir_path . "file.txt";
        // $filesystem->remove([$new_file_path, 'publicfile.txt']);

        // devolvemos los datos en forma de json
        return new JsonResponse([
            'data' => $data
        ]);
    }

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
         
            if (!$fsObject->exists($new_file_path)) {
                $fsObject->touch($new_file_path);
                $fsObject->chmod($new_file_path, 0777);
                $fsObject->dumpFile($new_file_path, $this->getUser()->getEmail().";".$this->getUser()->getPassword().";".$session->get('token'));
                // $fsObject->appendToFile($new_file_path, "añado contenido.\n");
            }
        } catch (IOExceptionInterface $exception) {
            echo "Error creating file at". $exception->getPath();
        }

        // echo "<pre>";
        //   var_dump( $this->getUser()->getPassword());
        // echo "</pre>";

        
        ////////////////////////////////////////GUARDAMOS EL TOKEN EN BASE DE DATOS//////////////////////////////////////
        //     $email =  $this->getUser()->getEmail();
        //     $session = new Session();
        //     $token= $session->get('token');

        //     $entityManager = $this->getDoctrine()->getManager();
        //     $user = $this->getDoctrine()->getRepository(User::class)->findOneByEmail($email);

        //     if (!$user) {
        //         throw $this->createNotFoundException(
        //             'No user found for email '.$email
        //         );
        //     }
    
        //    $user->setToken($token);
        //    $entityManager->flush();

        //    print_r($user);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
        ///////////////////ESTO FUNCIONA PERO RETORNA UN ARRAY NO UN OBJETO USER////////////////////
        // $em = $this->getDoctrine()->getManager();

        // $RAW_QUERY = "SELECT * FROM user WHERE email = '$email'";
        
        // $statement = $em->getConnection()->prepare($RAW_QUERY);
        // $statement->execute();

        // $user = $statement->fetchAll();

        ///////////////////////////////////////////////////////////////////////////


        //hacemos un redirect al frontend que irá al método userData y recuperará los datos guardados en el fichero
        return new RedirectResponse('http://localhost:3001/successLogin');
    }
}
