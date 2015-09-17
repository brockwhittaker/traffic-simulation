<?php
header("Content-type: text/css; charset=utf-8");


function explode_contents ($n) {
  return explode("=", $n);
}

function replace_commas ($x) {
  if (!preg_match("/\{|\}|media/", $x) && preg_match("/\:|\@/", $x)) {
    $x .= ";";
  }

  return $x;
}

function sort_vars_by_length ($vars, $replace) {
  /* this function sorts vars by length so that when you use array_map
     the largest variables are analyzed for matches first, which
     ensures that it doesn't match for a shorter variable and then
     leave the rest of the longer variable there. */
  do {
    $switch = false;
    for ($x = 0; $x < count($vars) - 1; $x++) {
      if (strlen($vars[$x + 1]) > strlen($vars[$x])) {
        $temp = $vars[$x];
        $temp2 = $replace[$x];

        $vars[$x] = $vars[$x + 1];
        $replace[$x] = $replace[$x + 1];

        $vars[$x + 1] = $temp;
        $replace[$x + 1] = $temp2;

        $switch = true;
      }
    }
  } while ($switch == true);

  return array($vars, $replace);
}

function calc($equation) {
    $equation = preg_replace('/\s+/', '', $equation); // Remove whitespaces
    $number = '((?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?|pi|π)'; // What is a number
    $functions = '(?:sinh?|cosh?|tanh?|acosh?|asinh?|atanh?|exp|log(10)?|deg2rad|rad2deg|sqrt|pow|abs|intval|ceil|floor|round|(mt_)?rand|gmp_fact)'; // Allowed PHP functions
    $operators = '[\/*\^\+-,]'; // Allowed math operators
    $regexp = '/^([+-]?(' . $number . '|' . $functions . '\s*\((?1)+\)|\((?1)+\))(?:' . $operators . '(?1))?)+$/'; // Final regexp, heavily using recursive patterns

    if (preg_match($regexp, $equation)) {
        $equation = preg_replace('!pi|π!', 'pi()', $equation); // Replace pi with pi function
        //echo "$equation\n";
        eval('$result = ' . $equation . ';');
    } else {
        $result = false;
    }

    return $result;
}

function eval_calc($x) {
  if (preg_match("/calc\[(.)+][0-9\$A-z-]+/", $x)) {
    $x = explode(":", $x);
    preg_match("/calc\[(.)+][0-9\$A-z-]+/", $x[1], $right_side);
    $units = preg_replace("/calc\[(.)+]/", "", $right_side[0]);
    $equation = preg_replace(array("/calc\[/", "/\][A-z0-9-]+/"), "", $right_side);
    $equation = calc($equation[0]);

    $x = $x[0] . ": " . $equation . $units;
  } else if (preg_match("/calc\[(.)+]/", $x)) {
    die("Error parsing. Check the line where the following is: " . $x);
  }

  return $x;
}

function remove_comments ($x) {
  if (preg_match("/\/\*(.|\n)*?\*\//", $x) && $_GET['min'] == "true") {
    return preg_replace("/\/\*(.|\n)*?\*\//", "", $x);
  } else {
    return $x;
  }
}

function SimpleCSS ($path) {
  $contents = explode("\n", file_get_contents($path));
  $vars = array();
  for ($x = 0; $x < count($contents); $x++) {
    if (preg_match("/\\$/", $contents[$x]) && preg_match("/\=/", $contents[$x])) {
      array_push($vars, $contents[$x]);
      unset($contents[$x]);
    }
  }

  $vars = array_map("explode_contents", array_filter($vars));

  for ($x = 0; $x < count($vars); $x++) {
    $replace[$x] = preg_replace("/;/", "", $vars[$x][1]);
    $vars[$x] = preg_replace("/[\s+]+/", "", $vars[$x][0]);
  }

  list($vars, $replace) = sort_vars_by_length($vars, $replace); // read func comments

  $contents = array_map(function ($x) use ($replace, $vars) {
    return str_replace($vars, $replace, $x);
  }, $contents);

  $contents = array_map("eval_calc", $contents);

  if (!$_GET['min'] == "true") {
    $implode_delim = "\n";
  }

  $contents = implode($implode_delim, array_map("replace_commas", $contents));

  if ($_GET['min'] == "true") {
    $contents = preg_replace("/[\s]{2,}/", " ", $contents);
    return remove_comments($contents);
  } else {
    return $contents;
  }
}


echo SimpleCSS($_GET['path']);
?>
