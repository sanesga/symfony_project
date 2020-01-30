<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils, Request $request,CsrfTokenManagerInterface $tokenManager ): Response {

       
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

    
        //IMPRIMIMOS EL TOKEN
        //   echo "<pre>";
        // var_dump('esto es el token:');
        //   var_dump($tokenManager->getToken('authenticate')->getValue());
        // echo "</pre>";

        //CREA EL FORMULARIO Y EL TOKEN
        $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);

        //CREAMOS LOS DATOS PARA ENVIAR

        $data[] = [
            "email" => $lastUsername,
            "password" => $this->getUser()->getPassword(),
            "token" => $tokenManager->getToken('authenticate')->getValue()
        ];
    
        return new JsonResponse([
            'data' => $data
        ]);
    }
    

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
    }
}

//OBTENEMOS EL USUARIO DE POSTMAN

    /**
     * @Route("/login", name="app_login")
     */
    // public function login(AuthenticationUtils $authenticationUtils, Request $request): Response
    // {
    //     // if ($this->getUser()) {
    //     //     return $this->redirectToRoute('target_path');
    //     // }

    //     if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
    //         $data = json_decode($request->getContent(), true);
    //         $request->request->replace(is_array($data) ? $data : array());

    //         $email = $request->request->get('email');
    //         $password = $request->request->get('password');
    //         $roles = $request->request->get('roles');

    //         $user = new User();
    //         $user->setEmail($email);
    //         $user->setPassword($this->passwordEncoder->encodePassword($user,$password));
    //         // $user->setPassword($password);
    //         $user->setRoles($roles);


    //     // get the login error if there is one
    //     $error = $authenticationUtils->getLastAuthenticationError();
    //     // last username entered by the user
    //     $lastUsername = $authenticationUtils->getLastUsername();

    //    // return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    //     }
    //     return new Response('Error with login'); 
    // }