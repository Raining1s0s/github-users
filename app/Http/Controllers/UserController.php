<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Support\Facades\Http;

use App\Models\User;
use Illuminate\View\View;
use Illuminate\Http\Request;
 
class UserController extends Controller
{
  /**
   * Show the profile for a given user.
   */
  public function findAllUsers(Request $request)
  {
    $search = $request->input('search');
    $token = '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';
    $headers = [
      'Accept' => 'application/vnd.github+json',
    ];
    $response = Http::withHeaders($headers)->withToken($token)->get('https://api.github.com/search/users?q='.$search);

    if ($response->successful()) {
      $data = $response->json(); // Get JSON response
      return $data;
    } else {
      $statusCode = $response->status();

      // Handle the error based on the status code
      return [
        'status' => $statusCode
      ];
    }
  }
  /**
   * Show the profile for a given user.
   */
  public function findFollowersByUser(Request $request, $username)
  {
    $page = $request->input('page') ?? 1;
    $token = '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';
    $headers = [
      'Accept' => 'application/vnd.github+json',
    ];
    $response = Http::withHeaders($headers)->withToken($token)->get('https://api.github.com/users/' . $username . '/followers' . '?' . 'page=' . $page);

    if ($response->successful()) {
      $data = $response->json(); // Get JSON response
      return $data;
    } else {
      $statusCode = $response->status();

      // Handle the error based on the status code
      return [
        'status' => $statusCode
      ];
    }
  }
}