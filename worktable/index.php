<?php get_header(); ?>

<section id="worktable-content" class="container">
  <div class="row">
    <div class="col-md-12"> 
    	<?php if (current_user_can( edit_others_pages )) : ?>
        <button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#wysiwyg"><i class="icon-pencil"></i> Edit</button>
		<?php endif; ?>
      <div id="content-body" class="entry-content"></div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
