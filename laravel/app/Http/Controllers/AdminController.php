<?php

namespace App\Http\Controllers;

use App\Product;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\View;
use Exception;

class AdminController extends ExceptionController
{
    //use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    /**
     * Load Admin Panel Home Page
     */
    public function LoadAdminHome(Request $request){
        return view("AdminLayout");
    }

    /**
     * Change Side Tabs
     */
    public function ChangeSideTab(Request $request){
        $pageType = Input::get('pageType');
        if($pageType == "Home"){
            $HTMLView = (String) view('AdminPanel.Home');
        }else if($pageType == "ProductAdd"){
            $HTMLView = (String) view('AdminPanel.Product_Add');
        }else if($pageType == "ProductView"){
            $HTMLView = (String) view('AdminPanel.Product_View');
        }

        // Put all data into Single Object
        $response['page'] = $HTMLView;
        return response()->json($response);
    }

    /**
     * Save New Product
     */
    public function SaveProduct(Request $request){
        // This should be replaced with $SESSION user id
        $added_user_id = 1;
        // Features JSON Object
        $features = array();
        for($i=1;$i<=18;$i++){
            if(Input::get('feature_'.$i) != ""){
                $features[$i] = Input::get('feature_'.$i);
            }else{
                $features[$i] = '';
            }
        }

        try{
            $newProduct = new Product;
            $newProduct->category = Input::get('categoryOPT');
            $newProduct->sub_category = Input::get('subcategoryOPT');
            $newProduct->product_name = Input::get('productName');
            $newProduct->product_brand = Input::get('productBrand');
            $newProduct->description =Input::get('description');
            $newProduct->price = Input::get('price');
            $newProduct->features = json_encode($features);
            $newProduct->guarantee = Input::get('guarantee');
            $newProduct->rating = 0;
            $newProduct->in_stock = Input::get('inStocks');
            $newProduct->added_user = $added_user_id;
            $newProduct->approve_status = 'YES';
            $newProduct->created_at = new \DateTime();

            $newProduct->save();

            $ProductID =  $newProduct->id;
            // Upload Images
            for($i=0;$i<5;$i++){
                if (isset(Input::file('images')[$i])) {
                    //This function will upload image
                    self::uploadImage($request,$i,$ProductID);
                }
            }

            $response['response'] = "SUCCESS";
            return response()->json($response);
        }catch (Exception $e){
            $this->LogError('Save Product Function (AdminController) -> ',$e);
            $response['response'] = "FAIL";
            return response()->json($response);
        }
    }

    /*
     * This function Uploads images to Server 'laravel/Images/Product' Folder
     */
    public function uploadImage(Request $request, $count, $id)
    {
        $imageName = "ProductImage" . $id . "-".($count+1).".png";
        $destinationPath = base_path() . '/Images/Product/';
        Input::file('images')[$count]->move($destinationPath, $imageName);
    }
}
