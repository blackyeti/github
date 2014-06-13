<?php

namespace jjm\VeloStarBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class VeloStarController extends Controller
{
    public function indexAction($section = 'home',$action = null)
    {
		$twigArray = array('section' => $section);
		
		return $this->render('jjmVeloStarBundle:VeloStar:index.html.twig',$twigArray);
    }
}
