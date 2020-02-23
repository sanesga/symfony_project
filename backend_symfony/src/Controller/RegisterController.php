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
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

//LOGS//
//echo "<pre>"
//var_dump($data);
//echo "</pre>";

class RegisterController extends AbstractController {

    private $passwordEncoder;
    
    public function __construct(UserPasswordEncoderInterface $passwordEncoder) {
             $this->passwordEncoder = $passwordEncoder;
    }
    
     /**
     * @Route("/register", name="register")
     */
    public function register(Request $request): Response{

       if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);

        $request->request->replace(is_array($data) ? $data : array());

        $em = $this->getDoctrine()->getManager();

        $email = $request->request->get('email');
        $password = $request->request->get('password');

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->passwordEncoder->encodePassword($user,$password));
        $user->setRoles([]);

        $em->persist($user);
        $em->flush();
        return new Response('New user saved');
    }
    return new Response('Error saving user');   
    }
}
