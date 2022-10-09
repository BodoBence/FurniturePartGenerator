// Class definitions
class Board {
    constructor(x, y, z, n, allocation) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.n = n;
      this.allocation = allocation
    }
}

var measurement_unit = ' mm'

// Start
window.onload = list_board_elements(destination=document.getElementById('boards_list_id'), 
        board_elements=(template_cupboard(
            total_width=document.getElementById('measurements_width_id').value, 
            total_height=document.getElementById('measurements_height_id').value, 
            total_depth=document.getElementById('measurements_depth_id').value, 
            board_height=document.getElementById('board_height_id').value,
            n_horizontal_dividers=document.getElementById('n_horizontal_dividers_id').value,
            n_vertical_dividers=document.getElementById('n_vertical_dividers_id').value

)));
// Interaction triggered update
let parameters = document.getElementsByClassName('parameter')
for (let i = 0; i < parameters.length; i++) {
    parameters[i].addEventListener('change', (event) => {
        list_board_elements(destination=document.getElementById('boards_list_id'), 
        board_elements=(template_cupboard(
            total_width=document.getElementById('measurements_width_id').value, 
            total_height=document.getElementById('measurements_height_id').value, 
            total_depth=document.getElementById('measurements_depth_id').value, 
            board_height=document.getElementById('board_height_id').value,
            n_horizontal_dividers=document.getElementById('n_horizontal_dividers_id').value,
            n_vertical_dividers=document.getElementById('n_vertical_dividers_id').value
            ))
        )
    })
}

// Functions
function template_cupboard(total_width, total_height, total_depth, board_height, n_horizontal_dividers, n_vertical_dividers) {
    let board_elements = []

    // Top and bottom 
    let top_bottom = new Board(
        x=total_width, 
        y=total_depth-board_height, 
        z=board_height,
        n=2, 
        allocation='top/bottom'
        )
    board_elements.push(top_bottom)
    
    // Vertical divisions
    let vertical = new Board(
        x=total_height-2*board_height,
        y=total_depth-board_height,
        z=board_height,
        n=n_vertical_dividers,
        allocation='side/vertical divider'
        )
    board_elements.push(vertical)

    // Back
    let back = new Board(
        x=total_width,
        y=total_height,
        z=board_height,
        n=1,
        allocation='back'
        )
    board_elements.push(back)


    // Horizontal dividers
    let shelf = new Board(
        x=(total_width-n_vertical_dividers*board_height)/(n_vertical_dividers-1),
        y=total_depth-board_height,
        z=board_height,
        n=n_horizontal_dividers,
        allocation='shelf'
        )
    board_elements.push(shelf)

    // Dooors
    let door = new Board(
        x=total_width/(n_vertical_dividers-1),
        y=total_height,
        z=board_height,
        n=n_vertical_dividers-1,
        allocation='door'
        )
    board_elements.push(door)

    return board_elements
}

function list_board_elements(destination, board_elements){
    // remove current elements
    while (destination.lastElementChild) {
        destination.removeChild(destination.lastElementChild);
    }

    // Create new elements
    board_elements.forEach(e => {
        let board_element = create_element_with_text(destination ,e.allocation, 'li')
        create_element_with_text(board_element ,'x ' + e.x + measurement_unit, 'p')
        create_element_with_text(board_element ,'y ' + e.y + measurement_unit, 'p')
        create_element_with_text(board_element ,'z ' + e.z + measurement_unit, 'p')
        create_element_with_text(board_element ,'number ' + e.n + 'pcs', 'p')
    });

    function create_element_with_text(node_destination, node_text, element_type){
        let node = document.createElement(element_type);
        node.appendChild(document.createTextNode(node_text));
        node_destination.appendChild(node);
        return node
    }
}