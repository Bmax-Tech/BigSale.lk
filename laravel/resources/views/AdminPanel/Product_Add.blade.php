    <!-- Main content -->
    <style>
        .example-modal .modal {
            position: relative;
            top: auto;
            bottom: auto;
            right: auto;
            left: auto;
            display: block;
            z-index: 1;
        }
        .example-modal .modal {
            background: transparent !important;
        }
        .btn-success:focus{
            outline: none !important;
        }
    </style>

    <div class="alert alert-danger alert-dismissable col-lg-3" id="alertPopup" style="display: none;position: fixed;z-index: 2;right: 18px;top: 70px;">
        <button type="button" class="close" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-ban"></i> Alert!</h4>
        Please check all required fields and submit.
    </div>
    <div class="alert alert-warning alert-dismissable col-lg-3" id="failPopup" style="display: none;position: fixed;z-index: 2;right: 18px;top: 70px;">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-warning"></i> Alert!</h4>
        Some Technical issue occurred !
    </div>
    <div class="alert alert-success alert-dismissable col-lg-3" id="successPopup" style="display: none;position: fixed;z-index: 2;right: 18px;top: 70px;">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4>	<i class="icon fa fa-check"></i> Alert!</h4>
        Product successfully saved
    </div>

    <section class="content" id="confirmMessage" data-to="productAddForm" style="display: none;position: fixed;margin: 12% 18%;z-index: 1">
        <div class="example-modal">
            <div class="modal modal-primary">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" onclick="Confirm('close','productAddForm')" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><i class="fa fa-info-circle"></i>&nbsp;&nbsp;Confirmation Message</h4>
                        </div>
                        <div class="modal-body">
                            <p>Do you want to save this product&nbsp;?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" onclick="Confirm('close','productAddForm')" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                            <button type="button" id="productAddFormSavebtn" onclick="Confirm('save','productAddForm')" class="btn btn-outline">Save</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        </div><!-- /.example-modal -->
    </section>

    <section class="content">
        <div class="row">
            <!-- form start -->
            <form role="form" id="productAddForm" enctype="multipart/form-data">
            <div class="col-md-12">
                <!-- general form elements -->
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title"><i class="fa fa-dropbox"></i>&nbsp;&nbsp;Add New Product</h3>
                    </div><!-- /.box-header -->
                        <div class="box-body col-md-6">
                            <div class="form-group">
                                <label>Category</label>
                                <select class="form-control" name="categoryOPT" id="categoryOPT">
                                    <option value="">Select</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                    <option>option 5</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Sub Category</label>
                                <select class="form-control" name="subcategoryOPT" id="subcategoryOPT">
                                    <option value="">Select</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                    <option>option 5</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Product Name</label>
                                <input type="text" name="productName" class="form-control" placeholder="Product Name">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Product Brand</label>
                                <input type="text" name="productBrand" class="form-control" placeholder="Product Brand">
                            </div>
                            <!-- textarea -->
                            <div class="form-group">
                                <label>Product Description</label>
                                <textarea class="form-control" name="description" id="description" rows="4" style="min-height: 108px;" placeholder="Enter ..."></textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Price</label>
                                <input type="text" name="price" class="form-control" placeholder="Price">
                            </div>
                        </div><!-- /.box-body -->

                        <div class="box-body col-md-6">
                            <div class="col-lg-12" style="padding: 0px">
                                <div class="col-lg-11" style="padding-left: 0px;padding-right: 0px">
                                    <div  class="col-lg-6" style="padding-left: 0px">
                                        <?php
                                            for($i=1;$i<=18;){
                                        ?>
                                        <div class="form-group" id="feature_<?php echo $i; ?>" <?php if($i>10){ echo 'style="display:none"'; } ?>>
                                            <label>Feature <?php echo $i; ?></label>
                                            <input type="text" class="form-control" name="feature_<?php echo $i; ?>" id="feature_input_<?php echo $i; ?>" placeholder="Enter Feature <?php echo $i; ?>">
                                        </div>
                                        <?php
                                                $i=$i+2;
                                            }
                                        ?>
                                    </div>
                                    <div  class="col-lg-6" style="padding-left: 0px">
                                        <?php
                                        for($i=2;$i<=18;){
                                        ?>
                                        <div class="form-group" id="feature_<?php echo $i; ?>" <?php if($i>10){ echo 'style="display:none"'; } ?>>
                                            <label>Feature <?php echo $i; ?></label>
                                            <input type="text" class="form-control" name="feature_<?php echo $i; ?>" id="feature_input_<?php echo $i; ?>" placeholder="Enter Feature <?php echo $i; ?>">
                                        </div>
                                        <?php
                                            $i=$i+2;
                                        }
                                        ?>
                                    </div>
                                </div>
                                <div class="col-lg-1" style="padding: 0px">
                                    <div class="btn-group-vertical">
                                        <button type="button" class="btn btn-success" onclick="OptionsPicker('feature_','+',18,'features_count')" style="border-top-left-radius: 50%;border-top-right-radius: 50%"><i class="fa fa-plus-circle"></i></button>
                                        <button type="button" class="btn btn-success" id="features_count">10</button>
                                        <button type="button" class="btn btn-success" onclick="OptionsPicker('feature_','-',18,'features_count')" style="border-bottom-left-radius: 50%;border-bottom-right-radius: 50%"><i class="fa fa-minus-circle"></i></button>
                                        <span style="font-size: 10px;color: red">(max 18)</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Guarantee</label>
                                <input type="text" class="form-control" name="guarantee" placeholder="Enter Guarantee">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">In Stocks (Quantity)</label>
                                <input type="number" class="form-control" name="inStocks" placeholder="Enter Number">
                            </div>
                        </div><!-- /.box-body -->

                        <div class="box-footer">
                        </div>
                </div><!-- /.box -->
            </div>
            <div class="col-md-12">
                <!-- general form elements -->
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title"><i class="fa fa-file-picture-o"></i>&nbsp;&nbsp;Product Images</h3>
                    </div><!-- /.box-header -->
                    <div class="box-body col-md-12">
                        <?php
                            for($i=1;$i<=4;$i++){
                        ?>
                        <div class="form-group col-sm-3">
                            <div class="img-picker" id="img-picker-<?php echo $i; ?>"></div>
                        </div>
                        <?php
                            }
                        ?>
                        <div id="imageInputs" style="display: none"></div>
                    </div><!-- /.box-body -->

                    <div class="box-footer">
                        <div class="col-md-6">
                            <button type="button" onclick="Validate('productAddForm')" class="btn btn-block btn-primary btn-lg">Submit</button>
                        </div>
                        <div class="col-md-6">
                            <button type="reset" class="btn btn-block btn-danger btn-lg">Cancel</button>
                        </div>
                    </div>
                </div><!-- /.box -->
            </div>
        </form>

        </div>
    </section><!-- /.content -->

    <script src="{{ URL::asset('assets/Admin/plugins/image-picker/image-pickerJS.js') }}"></script>