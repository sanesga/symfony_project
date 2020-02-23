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

////////////////////////////////////LOGS/////////////////////////////////
//echo 'Se han encontrado ' . sizeof($restaurants) . ' restaurantes';

//echo "<pre>";
//var_dump('entra a create restaurant');
//echo "</pre>";

   // var_dump($array);


class RestaurantController extends AbstractController
{

    //////////////////////CREAR RESTAURANTES/////////////////////////
    /**
     * @Route("/restaurant", name="createRestaurant")
     */
    public function createRestaurant(Request $request): Response
    {
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

    //////////////////////////////////EDIAR RESTAURANTES///////////////////////////
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
        return new Response('Updated restaurant with id '.$restaurant->getId());
    }

    //////////////////////////////AÑADIR A FAVORITOS//////////////////////////////////
    /**
     * @Route("/addfavorite/{id}", name="addFavorite")
     */
    public function addFavorite($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $seccion = file_get_contents('../publicfile.txt');
        $array = explode(";", $seccion);
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
        "phone"=>$restaurant->getPhone(),
        "favorited"=>true
    ];
        $user = $this->getDoctrine()->getRepository(User::class)->findOneByEmail($array[0]);
        if (!$user) {
            throw $this->createNotFoundException(
                'No user found'
            );
        }
        $dataUser[] = [
        "id" => $user->getId()
    ];
        $restaurant->addUser($user);
        $entityManager->flush();

        $user->addRestaurant($restaurant);
        $entityManager->flush();

        return new JsonResponse([
        'restaurant' => $dataRestaurant
    ]);
    }

    ////////////////////////////////////ELIMIINAR DE FAVORITOS//////////////////////////
    /**
     * @Route("/deletefavorite/{id}", name="deleteFavorite")
     */
    public function deleteFavorite($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $seccion = file_get_contents('../publicfile.txt');
        $array = explode(";", $seccion);
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
        "phone"=>$restaurant->getPhone(),
        "favorited"=>false
    ];

        $user = $this->getDoctrine()->getRepository(User::class)->findOneByEmail($array[0]);
        if (!$user) {
            throw $this->createNotFoundException(
                'No user found'
            );
        }
        $dataUser[] = [
        "id" => $user->getId()
        ];

        $restaurant->removeUser($user);
        $entityManager->flush();

        $user->removeRestaurant($restaurant);
        $entityManager->flush();

        return new JsonResponse([
        'restaurant' => $dataRestaurant
    ]);
    }

    ///////////////////////////////////BORRAR RESTAURANTES/////////////////////////////
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
        return new Response('Deleted restaurant succesfully');
    }

    //////////////////////////////////////MOSTRAR UN RESTAURANTE//////////////////////////
    /**
     * @Route("/restaurant/{id}", name="show")
     */
    public function show($id)
    {
        $restaurant = $this->getDoctrine()->getRepository(Restaurant::class)->find($id);

        if (!$restaurant) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        //obtenemos el usuario logueado
        $seccion = file_get_contents('../publicfile.txt');

        if ($seccion) {
            //los pasamos a array
            $array = explode(";", $seccion);
      
            //buscamos el usuario (para obtener el id)
            $user = $this->getDoctrine()->getRepository(User::class)->findOneByEmail($array[0]);

            if (!$user) {
                throw $this->createNotFoundException(
                    'No user found'
                );

            }

            //obtenemos los usuarios que tienen el restaurante como favorito
            $users = $restaurant->getUsers();

            //buscamos si nuestro usuario está entre ellos

            for ($j = 0; $j <count($users); $j++) {
                if ($users[$j]->getId()==$user->getId()) {
                    //si está, ponemos el restaurante a favorite true
                    $data[] = [
                    "id" => $restaurant->getId(),
                    "name" => $restaurant->getName(),
                    "address" => $restaurant->getAddress(),
                    "category" => $restaurant->getCategory(),
                    "phone"=>$restaurant->getPhone(),
                    "favorited"=> true
                ];
                return new JsonResponse(['data' => $data]);
                }
            }
            $data[] = [
                "id" => $restaurant->getId(),
                "name" => $restaurant->getName(),
                "address" => $restaurant->getAddress(),
                "category" => $restaurant->getCategory(),
                "phone"=>$restaurant->getPhone(),
                "favorited"=> false
            ];
            return new JsonResponse(['data' => $data]); 
            
//si no hay datos en el archivo de texto
        }else{
            $data[] = [
                "id" => $restaurant->getId(),
                "name" => $restaurant->getName(),
                "address" => $restaurant->getAddress(),
                "category" => $restaurant->getCategory(),
                "phone"=>$restaurant->getPhone(),
            ];
            return new JsonResponse(['data' => $data]);  
        }
    }

    ///////////////////////////////////////////MOSTRAR TODOS LOS RESTAURANTES//////////////////////
    /**
     * @Route("/restaurants", name="showAll")
     */
    public function showAll()
    {
        $restaurants = $this->getDoctrine()->getRepository(Restaurant::class)->findAll();

        if (!$restaurants) {
            throw $this->createNotFoundException(
                'No restaurants found'
            );
        }
        for ($i = 0; $i <count($restaurants); $i++) {
            $restaurantsList[$i]= [
                "id" => $restaurants[$i]->getId(),
                "name" => $restaurants[$i]->getName(),
                "address" => $restaurants[$i]->getAddress(),
                "category" => $restaurants[$i]->getCategory(),
                "phone"=>$restaurants[$i]->getPhone(),
            ];
        }
        return new JsonResponse([
            'restaurants'=> $restaurantsList
        ]);
    }
    ///////////////////////////////////////////MOSTRAR LOS RESTAURANTES FAVORITOS DE UN USUARIO//////////////////////
    /**
     * @Route("/showfavorites", name="showfavorites")
     */
    public function showFavorites()
    {
        $restaurantsList=[];
        $k=0;

        $restaurants = $this->getDoctrine()->getRepository(Restaurant::class)->findAll();

        if (!$restaurants) {
            throw $this->createNotFoundException(
                'No restaurants found'
            );
        }

        //OBTENGO EL USUARIO LOGUEADO
        $seccion = file_get_contents('../publicfile.txt');

        //si hay datos
        if ($seccion) {
            //los pasamos a array
            $array = explode(";", $seccion);
           
            //buscamos el usuario (para obtener el id)
            $user = $this->getDoctrine()->getRepository(User::class)->findOneByEmail($array[0]);

            if (!$user) {
                throw $this->createNotFoundException(
                    'No user found'
                );
            }else{
     
                for ($i = 0; $i <count($restaurants); $i++) {

                    $users = $restaurants[$i]->getUsers();
                 
                    for ($j = 0; $j <count($users); $j++) {
    
                        if ($users[$j]->getId()==$user->getId()) {
    
                            $restaurantsList[$k]= [
                                "id" => $restaurants[$i]->getId(),
                                "name" => $restaurants[$i]->getName(),
                                "address" => $restaurants[$i]->getAddress(),
                                "category" => $restaurants[$i]->getCategory(),
                                "phone"=>$restaurants[$i]->getPhone(),
                                "favorited"=>true
                            ];
                            $k++;
                        }
                    }
                }
            }
            
            }
            return new JsonResponse([
                'restaurants'=> $restaurantsList
             ]);
    }
}
