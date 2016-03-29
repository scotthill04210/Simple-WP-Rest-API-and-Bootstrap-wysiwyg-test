<?php

// This Test requires WordPress REST API (Version 2): https://wordpress.org/plugins/rest-api/

if ( ! function_exists( 'worktable_setup' ) ) :

	function worktable_setup() {
		
		add_theme_support( 'menus' ); // Theme support for custom Menus
		
		function register_my_menus() {
		  register_nav_menus(
			array(
			  'primary-menu' => __( 'Primary Menu' ),
			  'secondary-menu' => __( 'Secondary Menu' ),
			  'footer-menu' => __( 'Footer Menu' ),
			  'sidebar-menu' => __( 'Sidebar Menu' )
			)
		  );
		}
		
		add_action( 'init', 'register_my_menus' );
	}
	
endif;

//add_action( 'after_setup_theme', 'worktable_setup' );

function worktable_styles() {
	
	wp_enqueue_style( 'worktable-prettify-styles', get_template_directory_uri() . '/wysiwyg/external/google-code-prettify/prettify.css'); // For wysiwyg
	
	wp_enqueue_style( 'worktable-bootstrap-styles', get_template_directory_uri() . '/bootstrap/css/bootstrap.min.css');
	
	wp_enqueue_style( 'worktable-font-awesome-styles', 'http://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css');	 // For wysiwyg
	
    wp_enqueue_style( 'worktable-wysiwyg-styles', get_template_directory_uri() . '/wysiwyg/index.css');
	
    wp_enqueue_style( 'main', get_template_directory_uri() . '/style.css');	

	
} add_action( 'wp_enqueue_scripts', 'worktable_styles' );


function theme_scripts() {
	
	wp_enqueue_script('jquery');
	
	// For media uploader, currently doesn't do more than console.log img url
	// http://qnimate.com/adding-multiple-images-using-wordpress-media-uploader/	
	wp_enqueue_media();	 	
		
	wp_enqueue_script(
		'worktable-jquery-hotkeys-scripts', // For wysiwyg https://mindmup.github.io/bootstrap-wysiwyg/ 
		get_template_directory_uri() . '/wysiwyg/external/jquery.hotkeys.js',
		array( 'jquery' ), '', true
	);	

	wp_enqueue_script(
		'worktable-bootstrap-scripts', //  bootstrap.js
		get_template_directory_uri() . '/bootstrap/js/bootstrap.min.js',
		array( 'jquery' ), '', true
	);	
	
	wp_enqueue_script(
		'worktable-prettify-scripts', // For wysiwyg https://mindmup.github.io/bootstrap-wysiwyg/ 
		get_template_directory_uri() . '/wysiwyg/external/google-code-prettify/prettify.js'
	);
	
	// For wysiwyg bootsrap https://mindmup.github.io/bootstrap-wysiwyg/ 
	wp_enqueue_script(
		'worktable-bootstrap-wysiwyg-scripts', 
		get_template_directory_uri() . '/wysiwyg/bootstrap-wysiwyg.js'
	);
	
	wp_localize_script( 'wp-api', 'WP_API_Settings', array( 'root' => esc_url_raw( rest_url() ), 'nonce' => wp_create_nonce( 'wp_rest' ) ) ); //  lil' help with routing for this test	
	
	wp_enqueue_script(
		'worktable-app-script', // The meat and potatoes of this test
		get_template_directory_uri() . '/js/app.js',
		array( 'jquery','wp-api','worktable-prettify-scripts' ), '', true
	);
	
		
}
add_action( 'wp_enqueue_scripts', 'theme_scripts', 20, 1 );

