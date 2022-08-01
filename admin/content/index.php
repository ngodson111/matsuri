<?php
    session_start();
    if(
        !isset($_SESSION['ipvx-5494-matsuri-username']) ||
        !isset($_SESSION['ipvx-5494-matsuri-userid'])
    ) {
        header("Location: ../auth/login.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin | Dashboard</title>

    <!-- BOOTSTRAP LINKS-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link href="https://kit-pro.fontawesome.com/releases/v5.15.4/css/pro.min.css" rel="stylesheet">
    <!-- BOOTSTRAP LINKS-->

    <!-- CSS -->
    <link rel="stylesheet" href="./assets/css/index.css">
    <!-- CSS -->
</head>

<body>

    <section id="container">
        <div class="sidebar">
            <div class="logo">
                <img class="active" src="./assets/img/logo.png" alt="">
            </div>
            <ul class="menu">
                <li class="active">
                    <a href="#">
                        <i class="fal fa-poll"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fal fa-loveseat"></i>
                        <span>Reservations</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fal fa-image"></i>
                        <span>Slider</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fal fa-microphone-stand"></i>
                        <span>karaoke Reservation</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fal fa-image"></i>
                        <span>Gallery</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fal fa-book"></i>
                        <span>Contact</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="content">
            <nav>
                <div class="bars">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="profile" data-toggle="modal" data-target="#settingsModal">
                    <div class="img">
                        <img src="./assets/img/profile.png" alt="">
                    </div>
                    <div class="name">
                        <h4><?php echo $_SESSION['ipvx-5494-matsuri-username']; ?></h4>
                        <span>Admin</span>
                    </div>
                </div>
            </nav>

            <div class="pages">
                <div id="page1">
                    <div class="pageheading">
                        <div class="pagetitle">
                            <h2>Dashboard</h2>
                            <span><i class="fal fa-home"></i> / dashboard</span>
                        </div>
                    </div>
                    <div class="pagebody">
                        <div class="cardwrapper" id="reservationtotal" title="Todays Reservation">
                            <span></span>
                            <i class="fal fa-couch"></i>
                        </div>
                        <div class="cardwrapper" id="karaokereservationtotal" title="Todays Karaoke Reservation">
                            <span></span>
                            <i class="fal fa-microphone-stand"></i>
                        </div>
                        <div class="cardwrapper" id="contacttotal" title="Todays Contact Messages">
                            <span></span>
                            <i class="fal fa-book"></i>
                        </div>
                        <div class="cardwrapper" id="imagestotal" title="Todays Images in Gallery">
                            <span></span>
                            <i class="fal fa-images"></i>
                        </div>
                    </div>
                </div>
                <div id="page2" style="display: none;">
                    <div class="pageheading">
                        <div class="pagetitle">
                            <h2>reservations</h2>
                            <span><i class="fal fa-home"></i> / table reservations</span>
                        </div>
                        <div class="actions">
                            <div class="search">
                                <input type="text" placeholder="Search">
                                <i class="fal fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div class="pagebody">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Guests</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="pagefooter">
                        <div class="pagination">
                        </div>
                    </div>
                </div>
                <div id="page3" style="display: none;">
                    <div class="pageheading">
                        <div class="pagetitle">
                            <h2>slider</h2>
                            <span><i class="fal fa-home"></i> / slider</span>
                        </div>
                        <div class="actions">
                            <div class="search">
                                <input type="text" placeholder="Search">
                                <i class="fal fa-search"></i>
                            </div>
                            <div class="add" data-toggle="modal" data-target="#addslider">
                                <i class="fal fa-plus"></i>
                            </div>
                        </div>
                    </div>
                    <div class="pagebody">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="pagefooter">
                        <div class="pagination">
                        </div>
                    </div>
                    <div class="pagemodal">
                        <!-- Add Modal -->
                        <div class="modal fade addslider" id="addslider" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="heading">
                                        <span>Add Slider</span>
                                        <div class="close" data-dismiss="modal">
                                            <i class="fal fa-times"></i>
                                        </div>
                                    </div>
                                    <div class="body p-3">
                                        <div class="form">
                                            <span>Title: <strong>*</strong></span>
                                            <input type="text" id="title" placeholder="eg. Japanese Style">
                                        </div>
                                        <div class="form">
                                            <span>Image: <strong>*</strong></span>
                                            <input type="file" id="image">
                                        </div>
                                        <div class="form">
                                            <span>Description: <strong>*</strong></span>
                                            <textarea id="description" cols="30" rows="10"
                                                placeholder="eg. We try to show you all Japanese..."></textarea>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <div class="buttons">
                                            <button>Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="page4" style="display: none;">
                    <div class="pageheading">
                        <div class="pagetitle">
                            <h2>karaoke reservation</h2>
                            <span><i class="fal fa-home"></i> / karaoke reservation</span>
                        </div>
                        <div class="actions">
                            <div class="search">
                                <input type="text" placeholder="Search">
                                <i class="fal fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div class="pagebody">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Songs</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Guests</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="pagefooter">
                        <div class="pagination">
                        </div>
                    </div>
                </div>
                <div id="page5" style="display: none;">
                    <div class="pageheading">
                        <div class="pagetitle">
                            <h2>Gallery</h2>
                            <span><i class="fal fa-home"></i> / gallary</span>
                        </div>
                        <div class="actions">
                            <div class="search">
                                <input type="text" placeholder="Search">
                                <i class="fal fa-search"></i>
                            </div>
                            <div class="add" data-toggle="modal" data-target="#addgallery">
                                <i class="fal fa-plus"></i>
                            </div>
                        </div>
                    </div>
                    <div class="pagebody">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Image</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="pagefooter">
                        <div class="pagination">
                        </div>
                    </div>
                    <div class="pagemodal">
                        <!-- Add Modal -->
                        <div class="modal fade addgallery" id="addgallery" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="heading">
                                        <span>Add Gallery</span>
                                        <div class="close" data-dismiss="modal">
                                            <i class="fal fa-times"></i>
                                        </div>
                                    </div>
                                    <div class="body p-3">
                                        <div class="form">
                                            <span>Type: <strong>*</strong></span>
                                            <select id="imagetype">
                                                <option value="Resturant">Resturant</option>
                                                <option value="Karaoke">Karaoke</option>
                                            </select>
                                        </div>
                                        <div class="form">
                                            <span>Image: <strong>*</strong></span>
                                            <input type="file" id="image">
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <div class="buttons">
                                            <button>Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="page6" style="display: none;">
                    <div class="pageheading">
                        <div class="pagetitle">
                            <h2>Contact Messages</h2>
                            <span><i class="fal fa-home"></i> / Contact Messages</span>
                        </div>
                        <div class="actions">
                            <div class="search">
                                <input type="text" placeholder="Search">
                                <i class="fal fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div class="pagebody">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="pagefooter">
                        <div class="pagination">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Settings Modal -->
    <div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="heading">
                    <span>Settings</span>
                    <div class="close" data-dismiss="modal">
                        <i class="fal fa-times"></i>
                    </div>
                </div>
                <div class="body">
                    <ul>
                        <li>
                            <a href="../../index.html" target="_blank">
                                <i class="fal fa-home mr-3"></i>
                                <span>Visit Site</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#changepassword">
                                <i class="fal fa-key mr-3"></i>
                                <span>Password</span>
                            </a>
                        </li>
                        <li>
                            <a href="../../aboutus.html" target="_blank">
                                <i class="fal fa-link mr-3"></i>
                                <span>About us</span>
                            </a>
                        </li>
                        <li>
                            <a href="../auth/signout.php">
                                <i class="fal fa-sign-out mr-3"></i>
                                <span>SignOut</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Change Password Modal -->
    <div class="modal fade changepassword" id="changepassword" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="heading">
                    <span>Change Password</span>
                    <div class="close" data-dismiss="modal">
                        <i class="fal fa-times"></i>
                    </div>
                </div>
                <div class="body p-3">
                    <div class="form">
                        <span>Old Password: <strong>*</strong></span>
                        <input type="password" id="oldpassword">
                    </div>
                    <div class="form">
                        <span>New Password: <strong>*</strong></span>
                        <input type="password" id="newpassword">
                    </div>
                    <div class="form">
                        <span>Confirm Password: <strong>*</strong></span>
                        <input type="password" id="confirmpassword">
                    </div>
                </div>
                <div class="footer">
                    <div class="buttons">
                        <button>Change</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SCRIPTS -->
    <script src="./assets/js/common.js"></script>
    <script src="./assets/js/app.js"></script>
    <script src="./assets/js/slider.js"></script>
    <script src="./assets/js/reservation.js"></script>
    <script src="./assets/js/karaokereservation.js"></script>
    <script src="./assets/js/gallery.js"></script>
    <script src="./assets/js/contact.js"></script>
    <!-- SCRIPTS -->
</body>

</html>