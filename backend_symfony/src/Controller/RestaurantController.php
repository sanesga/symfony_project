<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
//importamos la clase restaurante
use App\Entity\Restaurant;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class RestaurantController extends AbstractController
{
    /**
     * @Route("/restaurant", name="createRestaurant")
     */
    public function createRestaurant(Request $request): Response
    {
        //     echo "<pre>";
        //     var_dump('entra a create restaurant');
        //    echo "</pre>";


        if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
            $data = json_decode($request->getContent(), true);
 
            $request->request->replace(is_array($data) ? $data : array());
 
            $name = $request->request->get('name');
            $address = $request->request->get('address');
            $category = $request->request->get('category');
            $phone = $request->request->get('phone');

            $em = $this->getDoctrine()->getManager();
 
            $restaurant = new Restaurant();
            $restaurant->setName($name);
            $restaurant->setAddress($address);
            $restaurant->setCategory($category);
            $restaurant->setPhone($phone);

      
            $em->persist($restaurant);
            $em->flush();
            return new Response('Saved new restaurant with id '.$restaurant->getId());
        }
        return new Response('Error creating restaurant');
    }


    /**
     * @Route("/restaurant/edit/{id}")
     */
    public function update($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $restaurant = $entityManager->getRepository(Restaurant::class)->find($id);

        if (!$restaurant) {
            throw $this->createNotFoundException(
            'No restaurant found for id '.$id
        );
        }

        $restaurant->setName('La picaeta de Carmeta');
        $entityManager->flush();

        // return $this->redirectToRoute('restaurant_show', [
        //     'id' => $restaurant->getId()
        // ]);
        return new Response('Updated restaurant with id '.$restaurant->getId());
    }
    /**
     * @Route("/favorite/{id}", name="addFavorite")
     */
    public function addFavorite($id)
    {

        $entityManager = $this->getDoctrine()->getManager();
        
        //leemos los datos del fichero
        $seccion = file_get_contents('../publicfile.txt');
        //los pasamos a array
        $array = explode(";", $seccion);
        // var_dump($array);

        //los copiamos en el array de datos
    //     $data[] = [
    //   "email" => $array[0],
    //   "password" => $array[1],
    //   "token" => $array[2]
    //     ];

       // var_dump($array[0]);
    
        //buscamos el restaurante
        $restaurant = $this->getDoctrine()->getRepository(Restaurant::class)->find($id);

        if (!$restaurant) {
            throw $this->createNotFoundException(
            'No restaurant found'
        );
        }
        $dataRestaurant[] = [
        "id" => $restaurant->getId(),
        "name" => $restaurant->getName(),
        "address" => $restaurant->getAddress(),
        "category" => $restaurant->getCategory(),
        "phone"=>$restaurant->getPhone()
    ];

        //buscamos el usuario (para obtener el id)
        $user = $this->getDoctrine()->getRepository(User::class)->findOneByEmail($array[0]);

        if (!$user) {
            throw $this->createNotFoundException(
            'No user found'
        );
        }

        $dataUser[] = [
        "id" => $user->getId()
    ];

        var_dump($dataUser);

        //añadimos el id del usuario en el restaurante
         $restaurant->addUser($user);
         $entityManager->flush();

        //añadimos el id del restaurante en el usuario
        $user->addRestaurant($restaurant);
        $entityManager->flush();

       



        return new Response('Favorite added');
    //    return new JsonResponse([
    //     'data' => $data
    // ]);
    }

    /**
     * @Route("/restaurant/delete/{id}")
     */
    public function delete($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $restaurant = $entityManager->getRepository(Restaurant::class)->find($id);

        if (!$restaurant) {
            throw $this->createNotFoundException(
            'No restaurant found for id '.$id
        );
        }

        $entityManager->remove($restaurant);
        $entityManager->flush();

        // return $this->redirectToRoute('restaurant_show', [
        //     'id' => $restaurant->getId()
        // ]);
        return new Response('Deleted restaurant succesfully');
    }


    /**
     * @Route("/restaurant/{id}", name="show")
     */
    public function show($id)
    {
        $restaurant = $this->getDoctrine()
        ->getRepository(Restaurant::class)
        ->find($id);

        if (!$restaurant) {
            throw $this->createNotFoundException(
            'No product found for id '.$id
        );
        }

        $data[] = [
        "id" => $restaurant->getId(),
        "name" => $restaurant->getName(),
        "address" => $restaurant->getAddress(),
        "category" => $restaurant->getCategory(),
        "phone"=>$restaurant->getPhone()
    ];

        return new JsonResponse([
        'data' => $data
    ]);
        // or render a template
    // in the template, print things with {{ restaurant.name }}
    // return $this->render('restaurant/show.html.twig', ['restaurant' => $restaurant]);
    }

    /**
     * @Route("/restaurants", name="showAll")
     */
    public function showAll()
    {
        $restaurants = $this->getDoctrine()
        ->getRepository(Restaurant::class)
        ->findAll();

        if (!$restaurants) {
            throw $this->createNotFoundException(
            'No product found for id '.$id
        );
        }

        //echo 'Se han encontrado ' . sizeof($restaurants) . ' restaurantes';

        //copiamos el array de objetos restaurante a un array asociativo
        for ($i = 0; $i <count($restaurants); $i++) {
            // echo $restaurants[$i];
            $restaurantsList[$i]= [
            "id" => $restaurants[$i]->getId(),
            "name" => $restaurants[$i]->getName(),
            "address" => $restaurants[$i]->getAddress(),
            "category" => $restaurants[$i]->getCategory(),
            "phone"=>$restaurants[$i]->getPhone()
        ];
        }

        //devolvemos el array de restaurantes en formato JSON
        return new JsonResponse([
        'restaurants'=> $restaurantsList
    ]);

        //     return new Response('Check out this greats restaurants: ' . $item);
    
    // or render a template
    // in the template, print things with {{ restaurant.name }}
    // return $this->render('restaurant/show.html.twig', ['restaurant' => $restaurant]);
    }
}
