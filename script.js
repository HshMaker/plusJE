const englishWords = [
    { word: "potential", meaning: "잠재력"},
    { word: "professional", meaning: "전문가"},
    { word: "attitude", meaning: "태도"},
    { word: "predator", meaning: "포식자"},
    { word: "property", meaning: "재산"},
    { word: "real estate", meaning: "부동산"},
    { word: "isolation", meaning: "소외감"},
    { word: "temperature", meaning: "온도"},
    { word: "fabric", meaning: "직물"},
    { word: "consume", meaning: "소비하다, 섭취하다"},
    { word: "affection", meaning: "애정, 사랑"},
    { word: "absence", meaning: "부재, 없음"},
    { word: "comment", meaning: "언급, 논평"},
    { word: "troop", meaning: "군대, 무리"},
    { word: "pressure", meaning: "압력"},
    { word: "adverse", meaning: "거꾸로의"},
    { word: "allocate", meaning: "할당하다"},
    { word: "edible", meaning: "먹을 수 있는"},
    { word: "unanimously", meaning: "만장일치로"},
    { word: "restrain", meaning: "제한하다, 억누르다"},
    { word: "aspiration", meaning: "열망, 포부"},
    { word: "commodity", meaning: "상품"},
    { word: "statistics", meaning: "통계"},
    { word: "invade", meaning: "침입하다"},
    { word: "fierce", meaning: "사나운, 격렬한"},
    { word: "surplus", meaning: "나머지(의)"},
    { word: "oversee", meaning: "감독하다"},
    { word: "sprain", meaning: "삐다, 접질리다"},
    { word: "infer", meaning: "추론하다, 의미하다"},
    { word: "utility", meaning: "유용성"},
    { word: "punish", meaning: "처벌하다"},
    { word: "physiological", meaning: "생리(학)적인"},
    { word: "scatter", meaning: "뿌리다"},

];

const japaneseWords = [
    { word: "ゆき", meaning: "눈사람"},
    { word: "とり", meaning: "새"},
    { word: "おんせん", meaning: "온천"},
    { word: "さかな", meaning: "생선"},
    { word: "かわ", meaning: "강"},
    { word: "さくら", meaning: "벚꽃"},
    { word: "ねこ", meaning: "고양이"},
    { word: "ちかてつ", meaning: "지하철"},
    { word: "あし", meaning: "발"},
    { word: "せかい", meaning: "세계"},
    { word: "いす", meaning: "의자"},
    { word: "かお", meaning: "얼굴"},
    { word: "いえ", meaning: "집"},
    { word: "まんが", meaning: "만화"},
    { word: "かしゅ", meaning: "가수"},
    { word: "たまご", meaning: "달걀"},
    { word: "じしょ", meaning: "사전"},
    { word: "てんぷら", meaning: "튀김"},
    { word: "べんとう", meaning: "도시락"},
    { word: "いしゃ", meaning: "의사"},
    { word: "しんぶん", meaning: "신문"},
    { word: "コンビニ", meaning: "편의점"},
    { word: "パン", meaning: "빵"},
    { word: "ゲーム", meaning: "게임"},
    { word: "ケーキ", meaning: "케이크"},
    { word: "リンゴ", meaning: "사과"},
    { word: "コップ", meaning: "컵"},
    { word: "プール", meaning: "수영장"},
    { word: "バナナ", meaning: "바나나"},
    { word: "スカート", meaning: "치마"},
    { word: "ピアノ", meaning: "피아노"},
]

let words = [];

const each_words = document.querySelectorAll(".each_word");
const realgame = document.getElementById("realgame");
const gameMenu = document.getElementById("game_menu");
const endingPanal = document.getElementById("EndingPanal");

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function selectWords() {
    if(!gameMenu) return
    if(gameMenu.classList.contains("japan")) {
        words = japaneseWords
    } else {
        words = englishWords
    }
}

let currentWord;

let nowmeaning;

let everyIndex = 0;

let failedCount = 0;

selectWords()

shuffle(words)


function getRandomWord() {
    if (everyIndex >= words.length) return "finish";
    return words[everyIndex];
}

function startGame() {
    resetGame();
    currentWord = getRandomWord();
    everyIndex++;
    correct()
    
    // for (let i = 0; i < 200; i++) {
    //     const randomIndex2 = Math.floor(Math.random() * words.length);
    //     if(words[randomIndex2].meaning == meaning || randomIndex2 == randomIndex) continue;
        
    //     d_words[randomIndex2].innerHTML = words[randomIndex2].meaning;
    //     console.log("hi")
    // }
}

function resetGame() {

    gameMenu.classList.add("none");
    realgame.classList.remove("none");
}

each_words.forEach((eachWord, i) => {

    eachWord.addEventListener("click", (e) => {
        if (eachWord.innerHTML == nowmeaning) {
            correct();
            return;
        }
        failedCount++;
        UpdateFail();
    })
})

function UpdateFail() {
    const failcount = document.querySelectorAll("#failCount");
    failcount.forEach((c, i) => {
        c.innerText = `Fail Count : ${failedCount}`
    })
}   

function correct() {

    currentWord = getRandomWord();
    everyIndex++;

    if (currentWord == "finish") {
        Success();
        return;
    }
    nowmeaning = currentWord.meaning

    document.getElementById("mainword").firstElementChild.innerHTML = currentWord.word

    const d_words = document.querySelectorAll(".each_word");
    const randomIndex = Math.floor(Math.random() * 4);
    d_words[randomIndex].innerHTML = nowmeaning;
    d_words.forEach((word, i) => {
        let randomIndex2 = Math.floor(Math.random() * words.length);
        if(i == randomIndex) return;
        if(words[randomIndex2].meaning == nowmeaning) {
            randomIndex2 = Math.floor(Math.random() * words.length);
        }
        
        d_words.forEach((word1, j) => {
            if (words[randomIndex2].meaning == word1.innerHTML) {
                randomIndex2 = Math.floor(Math.random() * words.length);
            }
        })

        word.innerHTML = words[randomIndex2].meaning;
    })
}

function Success() {
    gameMenu.classList.add("none");
    realgame.classList.add("none");
    endingPanal.classList.remove("none");
}