<!DOCTYPE html>
<html>
    <head>
        <title>.: GeOffice | Admin Panel :.</title>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<link rel="shortcut icon" type="image/x-icon" href="img/33-512.png" /> 
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="css/sweetalert2.css">
        <script type="text/JavaScript" src="js/jquery/jquery-1.7.1.js"></script>
        <script type="text/JavaScript" src="js/Validar.js"></script> 
        <script type="text/JavaScript" src="js/Sesiones.js"></script>
        <script type="text/JavaScript" src="js/Funciones.js"></script> 
		<script type="text/JavaScript" src="js/login.js"></script>
    </head>
    <body style="background: url(img/BackGroundWeb.png) no-repeat center center fixed; background-size: 100% 100%;">
    <div class="container">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <form role="form" id="formLogin">

                <br>
                    <div class="form-group">
						<center>
							<h2>GeOffice</br>Admin Panel</h2>
						</center>
                    </div>

                    <hr class="colorgraph">

                    <div class="form-group">
                        <input type="text" name="txtUsuario" id="txtUsuario" class="form-control input-lg" placeholder="Usuario" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" required>
                    </div>
                    <div class="form-group">
                        <input type="password" name="txtClave" id="txtClave" class="form-control input-lg" placeholder="Clave" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" required>
                    </div>

                    <hr class="colorgraph">

                    <div class="text-center">
                        <button type="button" class="btn btn-primary" id="btnAceptar">Iniciar Sesión <i class="fa fa-sign-in"></i></button>
                    </div>
					<div class="modal" id="loadModalLog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div style="margin-top: 20%;" align="center" class="sk-three-bounce">
							<img src="img/Glow2.gif" alt="Cargando..." style="width:15%; height:15%; opacity: 0.5;" />
						</div>
					</div>
                </form>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
	<script type="text/JavaScript" src="js/bootstrap.js"></script>
	<script type="text/JavaScript" src="js/sweetalert2.js"></script>
    </body>    
</html>