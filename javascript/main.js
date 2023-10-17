// Отримуємо посилання на кнопку та контейнер для зображень
let button = document.getElementById("button");
let images = document.getElementById("images");

// Масиви акордів
let chord_arr = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 
    [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
];

// Функція для зміни гами
function makeOtherGamma(gamma) {
    return gamma === 0 ? 1 : 0;
}

// Функція для обчислення відстані між акордами
function checkDistance(tone, gamma, start_chord) {
    if (Math.abs(tone - start_chord[1]) > 6) {
        return Math.abs(12 + start_chord[1] - tone) 
    } else {
        return Math.abs(tone - start_chord[1]) 
    }
}

// Функція для переміщення до іншого акорду
function moveTo(direction, tone, gamma, start_pos) {
    if (direction == 'right') {
        if (tone == 11) {
            tone = -1;
        }
        tone += 1
        return [tone, gamma, chord_arr[gamma][tone]];
    } else if (direction == 'left') {
        if (tone == 0) {
            tone = 12;
        }
        tone -= 1;
        return [tone, gamma, chord_arr[gamma][tone]];
    } else if (direction == 'up' || direction == 'down') {
        gamma = makeOtherGamma(gamma);
        return [tone, gamma, chord_arr[gamma][tone]];
    } else if (direction == 'downright' || direction == 'upright') {
        if (tone == 11) {
            tone = -1;
        }
        tone += 1;
        gamma = makeOtherGamma(gamma);
        return [tone, gamma, chord_arr[gamma][tone]];
    } else if (direction == 'downleft' || direction == 'upleft') {
        if (tone == 0) {
            tone = 12;
        }
        tone -= 1;
        gamma = makeOtherGamma(gamma);
        return [tone, gamma, chord_arr[gamma][tone]];
    }
}

// Функція для отримання випадкових акордів
function GetRandomChords(tone, gamma, chords) {
    let a = []
    let is_returned = 0;

    let major_directions = ['right', 'left', 'down', 'downright', 'downleft']
    let minor_directions = ['right', 'left', 'up', 'upright', 'upleft']

    let major_directions_come_back_left = ['left', 'downleft']
    let major_directions_come_back_right = ['right', 'downright']
    let minor_directions_come_back_left = ['left', 'upleft']
    let minor_directions_come_back_right = ['right', 'upright']

    if (gamma == 1) {
        if (tone >= 3) {
            tone -= 3;
        } else {
            tone -= 3;
            tone = Math.abs(tone);
            tone = 12 - tone;
        }
    }

    let start_pos = [gamma, tone];

    a.push(chord_arr[gamma][tone]);

    let direct = 'left';

    let dirrect_arrays = []

    while (a.length != chords) {
        let random_elem

        console.log(direct)

        if (gamma == 0) {
            random_elem = major_directions[Math.floor(Math.random()*major_directions.length)];

            if (checkDistance(tone, gamma, start_pos) + 1 >= chords - a.length) {
                dirrect_arrays.push(checkDistance(tone, gamma, start_pos))

                if (dirrect_arrays.length > 1) {
                    if (dirrect_arrays[dirrect_arrays.length - 1] > dirrect_arrays[dirrect_arrays.length - 2]) {
                        if (direct == 'left') {
                            direct = 'right'
                        } 
                        a.pop()
                        continue
                    }
                }

                if (direct == 'left') {
                    random_elem = major_directions_come_back_left[Math.floor(Math.random()*major_directions_come_back_left.length)]
                } else if (direct == 'right') {
                    random_elem = major_directions_come_back_right[Math.floor(Math.random()*major_directions_come_back_right.length)]
                }
            }

            random_chord = moveTo(random_elem, tone, gamma, start_pos)
            tone = random_chord[0]
            gamma = random_chord[1]
            a.push(random_chord[2]);

        } else {
            random_elem = minor_directions[Math.floor(Math.random()*minor_directions.length)]
            
            if (checkDistance(tone, gamma, start_pos) >= chords - a.length) {
                dirrect_arrays.push(checkDistance(tone, gamma, start_pos))

                if (dirrect_arrays.length > 1) {
                    if (dirrect_arrays[dirrect_arrays.length - 1] > dirrect_arrays[dirrect_arrays.length - 2]) {
                        if (direct == 'left') {
                            direct = 'right'
                        } 
                        a.pop()
                        continue
                    }
                }

                if (direct == 'left') {
                    random_elem = minor_directions_come_back_left[Math.floor(Math.random()*minor_directions_come_back_left.length)]
                } else if (direct == 'right') {
                    random_elem = minor_directions_come_back_right[Math.floor(Math.random()*minor_directions_come_back_right.length)]
                }
            }
                        
            random_chord = moveTo(random_elem, tone, gamma, start_pos)

            tone = random_chord[0]
            gamma = random_chord[1]
            a.push(random_chord[2]);
        }

    }

    return a;
}

// Функція для відображення акордів на сторінці
function printChords(arr) {
    let str = '';

    for (let i = 1; i <= arr.length; i++) {
        str += `
        <div class="col-md d-flex justify-content-center">
            <img src="images/${arr[i-1]}.png" class="img-fluid">
        </div>`
        if (i % 3 == 0) {
            str += `<div class="w-100"></div>`
        }
    }

    images.innerHTML = str;

}

button.addEventListener("click", (e) => {
    let tone = document.getElementById("inputGroupSelect01").value - 1;
    let gamma = document.getElementById("inputGroupSelect02").value - 1;
    let chords = document.getElementById("inputGroupSelect03").value;

    if (tone == NaN || gamma == NaN || chords == '') {
        alert("Введіть всі значення")
    } 
    else {
        for (let i = 0; i < chords.length; i++) {
            if (chords.charCodeAt(i) < 48 || chords.charCodeAt(i) > 57) {
                alert("Введіть лише цифри в полі!");
                break;
            }
        }
        new_arr = GetRandomChords(tone, gamma, chords);

        printChords(new_arr);
    }

});