<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<?php endif; ?>

<?php  if (current_user_can( edit_others_pages ) ? $userAuthorized = true : ''); ?>

<script type="text/javascript">
    var StylesheetURL = '<?php echo get_stylesheet_directory_uri(); ?>';
	var websiteURL = '<?php echo site_url(); ?>';
	<?php  if ($userAuthorized) { echo 'var userAuthorized = true;';} else {echo 'var userAuthorized = false;';} ?>	
</script> 

<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="wrapper" class="container-fluid">

<div id="wysiwyg" class="container modal fade" role="dialog"></div>

<header id="worktable-header" class="worktable-branding container">
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <h1 class="text-center">My API/Front End Editor Test</h1>
    </div>
  </div>
</header>
<hr>
