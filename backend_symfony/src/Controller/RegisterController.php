<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;

class RegisterController extends AbstractController
{
    
    public function index()
    {
        //aquí entra cuando entramos a localhost:8000/register
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/RegisterController.php',
        ]);
    }

     /**
     * @Route("/register", name="register")
     */
    public function register(Request $request): Response{
     
       if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        
        $request->request->replace(is_array($data) ? $data : array());

        // echo "<pre>";
        //   var_dump($data['email']);
        // echo "</pre>";

        $em = $this->getDoctrine()->getManager();

        $email = $request->request->get('email');
        $username = $request->request->get('username');
        $password = $request->request->get('password');

    
        $user = new User();
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($password);

        $em->persist($user);
        $em->flush();
        return new Response('Saved new user');
    }
    return new Response('Error saving user');   
    }
}
