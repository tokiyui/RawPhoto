function factorial(n) {
  if (n <= 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function combinations(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function permutations(n, r) {
  return factorial(n) / (factorial(n - r));
}

// 生写真を想定した1セット複数商品ver
function photo(m, n, k, r, nmax) {
  let p = new Array(nmax+1);
  for(let a = 0; a <= nmax; a++) {
    p[a] = new Array(r+1);
    for(let b = 0; b <= r; b++) {
      p[a][b] = 0;
    }
  }
  p[1][m] = 1;
  for (c = 2; c <= nmax; c++) {
    for(d = m; d <= r; d++) {
      for (let l = 0; l <= m; l++) {
        p[c][d] = p[c][d] + p[c-1][d-l] * combinations(m, l) * permutations(d-l, m-l) * permutations(r-(d-l), l) / permutations(r, m);
      }
    }
  }
  return p[n][r];   
}

function calculateProbability() {
  let m = parseInt(document.getElementById('m').value);
  let r = parseInt(document.getElementById('r').value);
  let nmax = 50; 
  let tableBody = document.getElementById('probabilityBody');
  tableBody.innerHTML = ''; // Clear previous table content
  
  for (let n = 1; n <= nmax; n++) {
    let probability = (100 * photo(m, n, r, r, nmax)).toFixed(2);
    
    let row = document.createElement('tr');
    let nCell = document.createElement('td');
    let probCell = document.createElement('td');
    
    nCell.textContent = n;
    probCell.textContent = probability + '%';
    
    row.appendChild(nCell);
    row.appendChild(probCell);
    tableBody.appendChild(row);
  }
}

document.getElementById('probabilityForm').addEventListener('submit', function(event) {
  event.preventDefault();
  calculateProbability();
});

