//jshint esversion:6


class Queue
{
  constructor()
  {
    this.items = [];
  }

  empty()
  {
    return this.items.length == 0;
  }

  push(element)
  {
    this.items.push(element);
  }

  pop()
  {
    if(this.empty())
    {
      return "underflow";
    }
    else{
      return this.items.shift();
    }
  }

  front()
  {
    if(this.empty())
    {
      return "Empty queue";
    }
    else
    {
      return this.items[0];
    }
  }

  printq()
  {
    var str = "";
    for(let i = 0; i<this.items.length; i++)
    {
      str += this.items[i] + " ";
    }
    return str;
  }
}


$(".bloc p").css("color","white");

$(".91").addClass("yem");
$(".91 p").css("color","yellow");

var current_selected = ".91";
var pos = current_selected.slice(1,3);

var is_block = false;

$("#block").click(function()
{
  if(is_block)
  {
    console.log("Block mode deactivated");
    is_block = false;
  }
  else
  {
    console.log("Block mode activated");
    is_block = true;
  }
});

var blocked_cells = [];

$(".bloc").click(function(event) {
  if(is_block)
  {
    var clicked = $(event.target).text();
    clicked = clicked.slice(0,2);
    $("."+clicked).addClass("bbl");
    $("."+clicked+" p").css("color","black");;
    var num = clicked;
    var temp_var_y = clicked%10;
    var temp_var_x = num - temp_var_y;
    temp_var_x /= 10;
    var points_to_be_inserted_in_blocked = [temp_var_x,temp_var_y];
    blocked_cells.push(points_to_be_inserted_in_blocked);
    console.log(blocked_cells);
  }
});

var moved  = 0;

function event_log()
{
  moved++;
  $("#moved_counter").text(moved);
}

function blink(x,y)
{

  console.log(current_selected);
  $(current_selected).removeClass("yem");
  $(current_selected+" p").css("color","white");

  $(current_selected).addClass("blum");
  $(current_selected+" p").css("color","blue");


  var new_pos_ = "";
  new_pos_ = "."+x+y;
  $(new_pos_).addClass("yem");
  $(new_pos_+" p").css("color","yellow");

  current_selected = new_pos_;

}

var arr_w = [];
var visited = [];
var infinity = Number.MAX_SAFE_INTEGER;

for(let i = 0; i< 10; i++)
{
  var temp = [];
  var bool = [];
  for(let j= 0; j<10; j++)
  {
    temp.push(infinity);
    bool.push(44);
  }
  visited.push(bool);
  arr_w.push(temp);
}

arr_w[0][0] = 0;

function is_inside(x, y)
{
  if((x>=0 && x<=9) && (y>=0 && y<=9))
  {
    for(let ghgh = 0; ghgh<blocked_cells.length; ghgh++)
    {
      if(x==blocked_cells[ghgh][0] && y==blocked_cells[ghgh][1])
      {
        return false;
      }
    }
    return true;
  }
  else
  {
    return false;
  }
}

const x_dir = [1,-1,0,0];
const y_dir = [0,0,-1,1];



var q = new Queue();
q.push(91);
visited[9][1] = 1;

$("#start").click(function() {
  console.log("You have initiated DFS");
  const myinterval = setInterval(function() {
    if(!q.empty())
    {
      BFS();
    }
    else
    {
      clearInterval(myinterval);
    }
  },400);
});

var cnt = 0;


function BFS()
{
    var some_ele = q.front();
    q.pop();
    var y = some_ele%10;
    var x = some_ele - y;
    x /= 10;
    cnt++;

    console.log(x+" "+y);

    blink(x,y);

    event_log();
    for(let k = 0; k<4; k++)
    {

      var x_temp = x + x_dir[k];
      var y_temp = y + y_dir[k];

      if(is_inside(x_temp, y_temp))
      {

        if(visited[Number(x_temp)][Number(y_temp)]==1)
        {
            ;
        }
        else
        {
          q.push(x_temp*10+y_temp);
          visited[Number(x_temp)][Number(y_temp)] = 1;
        }
      }
    }

}
