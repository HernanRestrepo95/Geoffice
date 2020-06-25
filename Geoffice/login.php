<!DOCTYPE html>
<html>
    <head>
        <title>.: GeOffice | Admin Panel :.</title>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<link rel="shortcut icon" type="image/x-icon" href="img/33-512.png" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.min.css">
		<link rel="stylesheet" type="text/css" href="css/select2.css">
        <script type="text/JavaScript" src="js/jquery/jquery-1.7.1.js"></script>
        <script type="text/JavaScript" src="js/Sesiones.js"></script> 
        <script type="text/JavaScript" src="js/Funciones.js"></script>
        <script type="text/JavaScript" src="js/Index.js"></script>
        <script type="text/JavaScript" src="js/Validar.js"></script>	
    </head>
    <body onload="gestionProfesores();" >
        <header>
            <div id="custom-bootstrap-menu" class="navbar navbar-default " role="navigation"> 
                <div class="container-fluid"> 
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-menubuilder">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span> 
                        </button> 
                    </div> 
                    <div class="collapse navbar-collapse navbar-menubuilder"> 
                        <ul class="nav navbar-nav navbar-left"> 
                            <li>
                                <a id="gestionProfesores" href="#">Gestión de Profesores</a> 
                            </li> 
                            <li>
                                <a id="gestionOficinas" href="#">Gestionar Oficinas</a> 
                            </li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right"> 
                            <li>
                                <a id="closeSession" href="#">Cerrar Sesion <i class="fa fa-sign-out"></i></a> 
                            </li> 
                        </ul> 
                    </div> 
					<div class="modal" id="loadModalLog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div style="margin-top: 20%;" align="center" class="sk-three-bounce">
							<img src="img/Glow2.gif" alt="Cargando..." style="width:15%; height:15%; opacity: 0.5;" />
						</div>
					</div>
                </div> 
            </div>
        </header>
        <article>
            <div id="main-page">
            
            </div>
        </article>
		<script type="text/JavaScript" src="js/jquery.dataTables.js"></script>
		<script type="text/JavaScript" src="js/select2.js"></script>
		<script type="text/JavaScript" src="js/bootstrap.js"></script>
    </body>    
</html>