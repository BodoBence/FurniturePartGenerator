// Class definitions
class Board {
    constructor(height, width, depth, allocation) {
      this.height = height;
      this.width = width;
      this.depth = depth;
      this.allocation = allocation
    }
}

// Start
window.onload = list_board_elements(destination=document.getElementById('boards_list_id'), 
        board_elements=(template_cupboard(
            total_width=document.getElementById('measurements_width_id').value, 
            total_height=document.getElementById('measurements_height_id').value, 
            total_depth=document.getElementById('measurements_depth_id').value, 
            board_height=document.getElementById('board_height_id').value,
            n_shelves=document.getElementById('n_shelves_id').value,
            n_vertical_divisions=document.getElementById('n_spaces_id').value

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
            n_shelves=document.getElementById('n_shelves_id').value,
            n_vertical_divisions=document.getElementById('n_spaces_id').value
            ))
        )
    })
}

// Functions
function template_cupboard(total_width, total_height, total_depth, board_height, n_shelves, n_vertical_divisions) {
    let board_elements = []

    // Top and bottom 
    let board_top = new Board(board_height, total_width, total_depth, 'top')
    board_elements.push(board_top)

    let board_bottom = new Board(board_height, total_width, total_depth, 'bottom')
    board_elements.push(board_bottom)
    
    // Vertical divisions
    for (let i = 0; i < n_vertical_divisions+2; i++) { // we must have 2 side boards always
        let vertical_board = new Board(height=board_height, width=total_height-2*board_height, depth=total_depth, allocation='side '+ (i + 1))
        board_elements.push(vertical_board)
    }

    // Horizonral division (Shelves)
    for (let i = 0; i < n_shelves; i++) {
        let board_shelf = new Board(board_height, total_width, total_depth, 'shelf '+ (i + 1))
        board_elements.push(board_shelf)
    }

    // Back
    let board_back = new Board(board_height, total_width+2*board_height, total_depth+2*board_height, 'back')
    board_elements.push(board_back)

    // Dooors

    return board_elements
}

function list_board_elements(destination, board_elements){
    // remove current elements
    while (destination.lastElementChild) {
        destination.removeChild(destination.lastElementChild);
    }

    // Create new elements
    board_elements.forEach(e => {
        console.log(e.allocation)
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(e.allocation+' '+e.height+' '+e.width+' '+e.depth));
        destination.appendChild(node);
    });
}