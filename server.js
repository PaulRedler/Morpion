// server.js (Node.js, ws)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

// état simple: une seule partie pour démo — pour plusieurs parties, créer des rooms
let clients = []; // {ws, id}
let game = {board:Array(9).fill(null), turn:'X', players:{X:null,O:null}};
let nextId = 1;

function broadcast(obj){
  const msg = JSON.stringify(obj);
  wss.clients.forEach(c => { if(c.readyState===WebSocket.OPEN) c.send(msg); });
}

wss.on('connection', (ws)=>{
  const id = nextId++;
  ws._id = id;
  clients.push(ws);
  console.log('connect', id);

  // assign player if free
  if(!game.players.X) game.players.X = id;
  else if(!game.players.O && game.players.X !== id) game.players.O = id;

  // send init state
  ws.send(JSON.stringify({type:'init', id, players:game.players, board:game.board, turn:game.turn}));
  broadcast({type:'players', players:game.players});

  ws.on('message', (data)=>{
    try{
      const msg = JSON.parse(data);
      if(msg.type==='move'){
        const {index, sym} = msg;
        // naive validation
        if(game.board[index]===null && game.turn===sym){
          game.board[index]=sym;
          game.turn = sym==='X'?'O':'X';
          broadcast({type:'move', index, sym, board:game.board, turn:game.turn});
        }
      } else if(msg.type==='reset'){
        game.board = Array(9).fill(null);
        game.turn = 'X';
        broadcast({type:'reset', board:game.board, turn:game.turn});
      }
    }catch(e){console.error(e)}
  });

  ws.on('close', ()=>{
    clients = clients.filter(c=>c._id!==id);
    if(game.players.X===id) game.players.X=null;
    if(game.players.O===id) game.players.O=null;
    broadcast({type:'players', players:game.players});
  });
});