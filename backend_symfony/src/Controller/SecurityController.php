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

class SecurityController extends AbstractController {

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

        //recogemos el token para guardarlos en session
           $token[] = [
             "token" => $tokenManager->getToken('authenticate')->getValue()
         ];
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
     * @Route("/frontend", name="frontend")
     */
    public function frontend( ): Response {

        $password = $this->getUser()->getPassword();

        //   echo "<pre>";
        //   var_dump( $this->getUser()->getPassword());
        // echo "</pre>";


        //iniciamos sesión
        $session = new Session();
       
        $data[] = [
            "email" => $this->getUser()->getEmail(),
            "password" => $this->getUser()->getPassword(),
            "token" => $session->get('token')
        ];

        //devolvemos los datos en forma de json
        return new JsonResponse([
            'data' => $data
        ]);
    }   
}