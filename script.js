<<<<<<< Updated upstream
// Toggle Spookify mode
document.getElementById('spookify-btn').addEventListener('click', () => {
    document.body.classList.toggle('spooky-mode');
=======
document.getElementById('spookify-btn').addEventListener('click', () => {
    document.body.classList.toggle('spooky-mode');
});

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('question-img');
const answerButtonsElement = document.getElementById('answer-buttons');
const trickBtn = document.getElementById('trick');
const treatBtn = document.getElementById('treat');
const explanation = document.getElementById('explanation');

let shuffledQuestions, currentQuestionIndex, score;

let tricks = [];
let treats = [];

const questions = {
    "BestBuy": {
        src: "imgs/600af6fea791ace718dc9106_Best-Buy-Phishing-Example-p-2000.png",
        redFlags: [
            "Urgent Language: Creates urgency to prompt quick action.",
            "Unfamiliar Sender: Email address may look similar to official domain but slightly altered.",
            "Link to Fake Website: Hovering over the link may reveal a suspicious URL.",
            "Generic Greeting: Often uses 'Dear customer' instead of your actual name."
        ]
    },
    "JimmyJohns": {
        src: "imgs/600b02fd8a6af519af43d8f7_jimmy-johns-phishing-example.png",
        redFlags: [
            "Unbelievable Offer: Promotes a deal that seems too good to be true.",
            "Unverified Links: Links may lead to untrusted sites that attempt to steal information.",
            "Noticeable Typos: Poor grammar and typos are common in phishing attempts."
        ]
    },
    "DocuSign": {
        src: "imgs/600b03b808e3d02c23d8132e_docusign-phishing-example.png",
        redFlags: [
            "Unexpected Document Request: Requests a signature without prior context.",
            "Suspicious Attachments: Legitimate DocuSign emails typically don’t send unsolicited attachments.",
            "Impersonation: Uses the DocuSign brand to gain credibility."
        ]
    },
    "DoorDash": {
        src: "imgs/600b03c7e6ddc2affe0ad09d_doordash-phishing-example.png",
        redFlags: [
            "Claims of Payment Issues: Mentions account issues to get personal information.",
            "Inconsistent Formatting: Email layout and visuals may differ from official DoorDash emails.",
            "Suspicious Links: Links may not match DoorDash’s official domain."
        ]
    },
    "Calendly": {
        src: "imgs/600b033b00395b5430274dd3_calendly-phishing-example.png",
        redFlags: [
            "Fake Meeting Invite: Sends unexpected meeting requests to trick recipients.",
            "Lookalike Domains: Links may lead to a fake Calendly site with a similar but altered URL.",
            "Language Errors: Unprofessional formatting and typos indicate a phishing attempt."
        ]
    },
    "GEICO": {
        src: "imgs/600b040d8a6af53c5043dcbf_geico-phishing-example-p-2000.png",
        redFlags: [
            "Account Issue Claims: Mentions issues with your account to induce worry.",
            "Suspicious Links: Links may not lead to GEICO’s official domain.",
            "Generic Greeting: Uses broad greetings like 'Dear customer' instead of personal details."
        ]
    },
    "GitHubInvite": {
        src: "imgs/github-collab-invite.webp",
        greenFlags: [
            "Official GitHub branding and formatting matches legitimate emails",
            "Links go to github.com domain with proper HTTPS",
            "Clear explanation of expiration timeline (7 days)",
            "Provides multiple options (accept/decline) rather than forcing one action",
            "Includes specific details like intended recipient email",
            "Has built-in abuse reporting and blocking options",
            "Clear profile pictures and repository information displayed"
        ]
    },
    "AmericanExpress": {
        src: "imgs/amex-savings-offer.webp",
        greenFlags: [
            "Sent from verified @americanexpress.com domain (blue checkmark)",
            "Professional design matches AmEx's brand guidelines",
            "Shows partial card number matching real account",
            "Includes accurate member since date",
            "Contains legitimate unsubscribe option and email preferences",
            "No urgent action required or threat language",
            "FDIC insurance properly referenced",
            "Includes legitimate card image and account details",
            "Professional footer with proper legal disclaimers",
            "'View this online' option provided for security"
        ]
    },
    "generalTips": {
        redFlags: [
            "Check the sender’s email address carefully.",
            "Look for grammar mistakes or poor formatting.",
            "Hover over links to verify their destination.",
            "Avoid opening attachments from unknown sources.",
            "Ignore unsolicited urgent requests."
        ]
    }
};
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
>>>>>>> Stashed changes
});

