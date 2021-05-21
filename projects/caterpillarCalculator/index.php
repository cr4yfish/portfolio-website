<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Caterpillar calculator</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="fonts.css">

        <link rel="stylesheet" href="https://use.typekit.net/rts3cue.css">

    </head>

    <body onload="loadDefaults();addListener();">

    <?php 
    
        include_once "connection.php";

    ?>

    <?php while($row = mysqli_fetch_array($result)) { ?>

       <span class="sqlData" style="z-index: -1; position: absolute;"> <?php echo $row["MONEY"]; ?> </span>
       
    <?php
        }
        ?>

        <div id="contentWrapper">


            <div id="calcWrapper">

                <div class="listEntry">
                    <span class="biloLight listEntryName smallHeader">Person</span>
                    <span class="biloLight listEntryUEC smallHeader">aUEC</span>
                </div>

                <div class="listEntry">
                    <span class="biloLight listEntryName">Anil</span>
                        <input maxlength="30"id="input1" onkeyup="addDot(this);" type="text" placeholder="aUEC amount"  class="inputCheck biloLight listEntryUEC listEntryInput">
                </div>

                <div class="spacer"></div>

                <div class="listEntry">
                    <span class="biloLight listEntryName">Hannes</span>
                        <input maxlength="30" id="input2" onkeyup="addDot(this);" placeholder="aUEC amount"  class="inputCheck biloLight listEntryUEC listEntryInput" type="text">
                </div>

                <div class="spacer"></div>

                <div class="listEntry">
                    <span class="biloLight listEntryName">Manuel</span>
                        <input maxlength="30" id="input3" onkeyup="addDot(this);" placeholder="aUEC amount" class="inputCheck biloLight listEntryUEC listEntryInput" type="text">
                </div>

                <div class="listEntry">
                    <span class="biloLight listEntryName">Total</span>
                        <span maxlength="30" id="together" class="biloLight listEntryUEC listEntryInput">0</span>
                </div>
            </div>

            <button id="nextBTN" class="biloLight btn btn-primary" onclick="nextExec();">next</button>

        </div>
        
        <script src="mainScript.js" async defer></script>
    </body>
</html>