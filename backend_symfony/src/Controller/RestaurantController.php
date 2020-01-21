<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
//importamos la clase restaurante
use App\Entity\Restaurant;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;



class RestaurantController extends AbstractController
{
    /**
     * @Route("/restaurant", name="createRestaurant")
     */
    public function createRestaurant(): Response
    {
         // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to the action: createProduct(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();

        $restaurant = new Restaurant();
        $restaurant->setName('Gran Muralla');
        $restaurant->setAddress('Calle Fuente, 14, Valencia');
        $restaurant->setCategory('Chino');
        $restaurant->setPhone('600323232');

      
        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($restaurant);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new restaurant with id '.$restaurant->getId());
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
        'success' => true,
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
