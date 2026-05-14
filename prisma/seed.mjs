import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sections = {
  relationship_intimacy: `
What makes you care about someone?
What's a moment you felt truly connected to <insert name>?
What were the red flags you noticed about <insert name> from the start?
What's your number one piece of advice when it comes to dating?
Would you rather relive the first time you fell in love or your first date?
Would you rather never be able to say "I love you" or never hear it from someone else?
Would you rather live without ever knowing love, or die from a broken heart?
Would you rather be dumped over text or in a public place?
Have you ever broke someone's heart?
Who was your first kiss?
If you had to pick someone in this room to be your partner on a game show, who would it be and why?
How many people have you kissed?
Who is the best kisser you've ever had?
Would you rather enjoy a spontaneous kiss or a planned one?
How important do you think sexual activities is in a relationship?
What's the quickest way to your heart?
What's more painful: clinging to a toxic love or leaving someone you still care for but no longer love?
If you had the option of meeting your soulmate right now, would you? Are you ready?
Would you rather be ghosted or led on?
What's the most romantic thing you've ever done?
Have you ever had a crush on one of your close friends but never told them or anyone?
Besides cheating and lying, what else destroys a relationship?
Would you rather have a jealous partner or one that is nonchalant?
How do you feel about sharing your social media passwords with your partner?
Who do you think gives the worst dating advice?
What did your friends think about your current partner or ex when you first started dating?
Would you rather chase after someone who's out of reach or settle for someone within reach?
Would you rather be with someone who ghosts you for days or is constantly clingy?
What was the worst date you've ever been on?
Who do you think has the best taste in men/women?
Who do you think has the worst taste in men/women?
Would you go back to any of your exes?
Do you think flirting is cheating?
Have you ever considered cheating on a partner?
What was the best date you've ever been on?
Who among your friends just can't seem to get out of talking stages?
Why do you think your last situationship failed?
Would you date a TikTok boy/girl?
Would you rather be with someone who is exactly like you or the complete opposite?
Would you rather suffer a harsh and sudden heartbreak or a slow one?
Do you like when your partner shows signs of jealousy?
What's scarier: being alone or settling for the wrong person?
Would you uproot and relocate your life for someone you love?
What are your top 3 most essential qualities in a romantic partner?
What is the sweetest thing anyone has ever done for you?
Would you ever take somebody back who cheated on you?
What was it like the first time you met your significant other?
What is your idea of a perfect date?
What is the most attractive quality in a man/woman?
When is the last time you felt butterflies?
Is it possible to stay friends with an ex?
What is a relationship dealbreaker for you?
What is the essential necessity in a romantic relationship?
What do you think my love language is?
What's your favorite quality of mine?
Do you believe in love at first sight? Why?
How would you rank your love languages?
How do you like to receive care?
Would you still stay with the love of your life even if he couldn't provide for you?
Should you be taking your friends' opinion on your relationship problems or should you figure it all out yourself privately?
What makes you more attracted to someone, looks or personality?
How long would you date someone for before you marry?
While being in a talking stage/situationship with someone, is it alright to talk to other people as well?
If you were to walk in on your significant other and your best friend having sex, who is your issue with?
What's the longest you have ever been in love for?
Does body count matter for you?
What's your deepest fear in a relationship?
What's your favorite non-sexual act of intimacy?
What's a compliment that made you feel special?
`,

  unknown_future: `
Do you think that people meet for a reason or by chance?
Would you rather your crush be able to read your mind or have access to your internet history?
What's the perfect age to marry for you?
What would you be willing to give up to achieve your dreams?
Do you think your priorities will change over time or generally stay the same?
When do you think you'll know you've met "The One"?
What qualities would you like in a future partner?
How will you know you've "made it"?
What keeps you up at night?
What do you need less of in your life?
How would you like people to experience you? What kind of person do you want to be in the world?
What would be your dream job if money didn't matter?
What would you choose as your last meal if you were on death row?
Who would no longer recognize you, not because of memory loss, but because you've changed?
Who's the person you're most afraid of becoming?
What do you want or wish most for your kids?
What have been the best and worst parts about getting older?
What's one thing you want people to always remember after you're gone?
Who would cry the most at your funeral?
If you could give your parents one thing in the world, what would it be?
If you had to pack up and move to another country tomorrow, where would you go?
What scares you the most about getting older?
What kind of parent do you think you will be?
`,

  dive_in_the_past: `
Who sticks out as being an early positive influence in your life?
What's the nicest thing someone has done for you?
If your younger self could meet you as an adult, what would they be most impressed by?
What did your first relationship teach you about love?
Have your values changed over time?
Have you ever given up on a dream? What was it?
What did you fear most growing up?
What's something you have done that your kid self never expected you to do?
What do you feel has been your greatest "win" so far in your life?
What's one childhood trauma you never told anybody about?
If you could go back in time and change a specific moment in your life, what would it be?
If someone offered you a box with everything you have lost, what's the first thing you would look for?
One thing about your life you never want to change?
What part of you feels unloved?
Which memory still feels like an open wound?
What's the "sorry" you never received?
What's the most painful "what if" you live with?
Do you think there's a part of you that you've lost?
What is your happiest memory with <insert name>?
What's the nicest thing <insert name> has ever done for you?
Do you think you had what people would consider a "normal" childhood?
What one thing did you overhear someone say that you wish you didn't? Who said it?
What are your core memories of your relationship with <insert name>?
What do you miss most about being a kid?
What parts of yourself have you lost by growing up?
What was the first thing you noticed about <insert name> when you first met?
What's a lesson you wish your parents would've taught you?
If you were to rewind your life to any moment in the past, what would it be?
Can you hate someone for what they've done, but still love them for who they had been?
What memory of you and <insert name> makes you cringe so much it hurts?
At which age do you think you were the best version of yourself?
What's the worst rumor you've heard about yourself?
Have you ever gotten picked up? If yes, tell us about it.
Tell us about one time you successfully picked up someone.
Did you ever hurt yourself willingly?
If you could travel back in time to any historical event, which would it be?
What do you wish you could re-live in your lifetime?
What was the best thing about how your parents raised you?
`,

  friends_council: `
Does having the right intentions mean you're a good person?
Who is the biggest snitch?
Do you believe in the concept of forgiveness? Why or why not?
Do you think finding a purpose in life is necessary?
What's an insecurity that has been holding you back lately?
What makes <insert name> different from anyone else you've ever met?
What's something you want to ask <insert name> but are too afraid to say?
If you walked into a room with everyone you've ever met, who'd you go looking for first?
How much do others' opinions impact who you're becoming?
Who do you feel most yourself around? Why?
What's a mistake you've repeated, knowing the outcome, but hoping for a different result?
When was the last time <insert name> made you cry? Why?
What do you regret telling <insert name>?
Close your eyes and describe the way <insert name> laughs. What makes it special?
How have you hurt others without realizing it? How?
What do you think you first bonded over with <insert name>?
What's something you're proud of, but never get to brag about?
Who in your life do you wish you met sooner?
Who do you feel most comfortable enough being yourself around?
Whose validation do you crave, but haven't received yet?
When do people stop being innocent?
When do you think you lost your innocence and why?
Who in your life most contradicts their words with their actions?
Who do you think is the player of the group?
Who do you think among your friends is the wisest?
Do you feel like you would be more confident if you were prettier?
What ethnicity is the most attractive to you?
What's something you regret oversharing with your friend?
Who is the most desperate for love?
Who is the most crusty person in the room?
Who among your friends has the best dressing style?
Who do you think is the biggest walking red flag?
Who is the biggest green flag?
If you had to fight for one global cause for the rest of your life, which would it be?
How do you prefer to be comforted when you're upset?
Do you typically follow your heart or your head?
Do you plan in advance, or save things for the last minute?
What's one thing <insert name> does that you wish they would stop doing?
Do you remember how you and <insert name> first met?
When was the last time you were jealous, and why?
What traits did you get from your parents?
What's the last lie you told?
Who are you most jealous of in the room?
Name one thing you'd change about every person in this room.
Who in this room would you list as your emergency contact?
If you could set anyone here up with your best friend, who would it be and why?
If you had one week to live and you had to marry someone in this room, who would it be?
List one positive and one negative thing about everyone in the room.
Who is the last person you stalked on social media?
What's the pettiest thing you've ever done?
Who in this room do you trust the least?
Who makes you laugh the most in the room?
What do you think people automatically assume about you when they look at you?
If you could hear every time someone said something good about you or something negative about you, which would you choose?
What's your go-to flirting move?
What is your most prized possession?
Who is the most important person in your life?
Who in your life has had the most influence on you?
If you could change one thing about your personality, what would it be?
When you are upset, do you want support or alone time?
Who is the most popular in the room?
Who is always late?
Who is always broke?
Who is the biggest flirt?
How do you feel about kissing in public?
Would you rather be called sexy, lovely, hot, or cute?
<insert name> changes up around people from the opposite gender.
How do you know when you can trust someone?
If you could trade places with someone for the day, who would you choose and why?
Do you think there's something that people misunderstand about you?
What would you do if your partner didn't like your best friend?
If you lost your job, which friend would you go to for help?
Who is the most people-pleaser?
If you could switch bodies with anybody in the room, who would it be and why?
Who is the best at flirting?
How much does your personality change when you're around different people?
Who is the most likely to protect everyone in a zombie apocalypse?
If you had a date with someone in this room right now, who would be the most uncomfortable person to go with?
If the person on your right had a warning label, what would it say?
Would you consider yourself an introvert or an extrovert?
What is the biggest lie you've ever told?
Who is the most gullible in the friend group?
What kind of energy do I give off: youngest sibling, middle child, oldest sibling, or only child?
Out of our entire friend group, who do you think I'm closest to?
What was your first impression of the person on your left when you first met?
What's your biggest insecurity?
If you could magically do one thing, what would you do?
Who was the easiest to approach and talk to?
What is one thing you would change about the person on your right?
Who is most likely to send corny texts?
How would you describe the person on your left to someone?
What is something you are bad at that you wish you were better at?
Who is the best at hiding their emotions?
What is your favorite thing about your friendship with the person on your right?
Who is the most likely to start drama?
Who is the most secretive?
Whose room reflects who they are the most?
Who is the friend that can't take a joke?
Which of your friends would you puke from right after kissing?
Would you rather start as friends with no feelings or start in a talking stage with the intentions of dating already there?
What do you look for in a guy/girl physically?
Who is the most entertaining person to hang out with?
What do you think your unique trait is?
What brings you peace when you are anxious?
What lie do you tell yourself the most?
What's some advice you tell others but don't follow yourself?
What do most people overestimate or underestimate about you?
`,

  friends_council_18plus: `
What's hotter, lingerie or no lingerie?
Who do you think is the best kisser?
Do you think you're a good kisser?
What body part turns you on the most?
Who was your first kiss with, and did you enjoy it?
What's the sexiest language for you?
What's your favorite sexual act of intimacy?
Who is the best at thirst traps?
What do you think about dirty talk?
What's the sexiest thing someone could say to you?
What's the weirdest place where you have ever done it?
Who currently has the highest chances to rizz you up in the room (except for your partner)?
When was the first time you made out and with who?
Out of the group, pick the most awkward threesome.
Who do you think has the best orgasm voice?
Who do you think is the most sexually experienced in your group?
Who would not hesitate to eat ass in your group?
Who is the most likely to open an OnlyFans account in the future? One guy and one girl.
Who is the most likely to have a one-night stand?
Who among the opposite gender is the most likely to make you orgasm the fastest?
Who turns you off the most among your group?
Who among your friends is the most vanilla?
Who here do you think is the most sexually frustrated?
Who here do you think gives the wildest sex?
Who among your friends of the opposite gender are you most sexually attracted to?
What's your weirdest kink?
Do you consider yourself good at flirting?
Who do you think is the best flirt among your friends?
What's the smallest time you got sexually physical with someone right after meeting them?
Pick your best threesome from your friends of the opposite gender.
What's the most sensitive part of your body apart from your genitals?
Tell us about the first time you masturbated.
Who do you think is the worst at kissing?
Who do you think gives their body away the easiest?
Would you rather have amazing sex that lasts a minute or have alright sex that lasts an hour?
What's one word that turns you on?
What's your favorite thing to do in bed?
What is something that would turn you off while already doing it with your partner?
Do you like to be dominated or do you prefer being the dominant one?
Have you ever fantasised about any of your friends?
Where do you enjoy being touched the most?
Ideally how long do you think sex should last?
What's the longest time you have had sex for?
What's the longest time you have done foreplay for?
What do you think is more enticing: sex in a bathtub or sex in a jacuzzi?
What's the longest you have ever gone without any kind of sexual activity (including masturbating)?
Who do you think masturbates the most?
Who do you think fucks around the most?
Who do you think is the most desperate for sex?
Who is your favorite pornstar?
Who would you enjoy making out with the most in the room right now?
Have you ever sent nudes before?
What kind of porn do you search for?
Do you prefer rough or romantic?
Where is your favorite spot to be kissed?
Have you ever tried to take a picture of yourself naked?
Have you ever thought about anybody in the room sexually?
Who in the room turns you on the most?
Have you ever sexted?
`,

  general: `
In Tarzan, do you think Tarzan was a virgin before he met Jane? Or was he clapping gorillas' cheeks?
If you had to change your name, what would your new one be?
If you could be the main character of any movie, what movie would it be?
If you could stay one age forever, what age would you choose?
Be honest — what is the last thing you searched on your phone?
What is your favorite sleeping position?
Do you think fish ever get thirsty?
What is your most-used emoji?
Have you ever peed in a pool?
If you were guaranteed to never get caught, who on Earth would you murder?
What's the longest you've gone without showering?
Have you ever farted and blamed it on someone else?
Have you ever peed in the shower?
Have you ever tasted a booger?
Who do you text the most?
Would you rather have a one-minute conversation with your past self or your future self?
Did anyone check up on you today?
Would you rather be liked by everyone you've ever met or obtain everything you've ever wanted?
Would you rather know when someone is lying or get away with any lie?
Would you rather always know what to say or always know what to do?
Spend a day with your past self or your future self?
Would you rather become a stranger to your family or forget who they are?
Would you rather relive the last 10 years of your life or get a million dollars?
What song will instantly make you smile?
What moment in your life felt like a scene straight out of a movie?
What's the worst nightmare you've had and the best dream you've had?
Does your wardrobe reflect who you are?
Would you rather have a pause button or a rewind button on your life?
What does living a "good life" mean to you?
If <insert name> lost their memory, what's the first thing you'd tell them about your relationship?
You are dating the love of your life for 5 years then find out they are your cousin. Are you staying or leaving?
Who is most likely to go to jail if their chats got leaked?
What's a song that nobody expects you to listen to?
If you won a five-minute shopping spree at any store, where would you choose?
What three words describe what you're most grateful for?
Would you rather people perceive you as being kind, smart, or attractive?
What was your best birthday and how did you celebrate?
If your home caught on fire, what is the first thing you would try to save?
What is the weirdest text message you've ever gotten?
`,

  couples_therapy: `
What is one thing that your partner has that you'd love to get rid of?
What is your partner's guilty pleasure?
When did you realize that your partner was "the one"?
Where did your first kiss happen?
What's your partner's worst habit?
What's the name of your partner's ex?
What did your partner wear on the first date?
How many dates did it take before you kissed?
What's something that always makes your partner laugh?
Is your partner a pessimist, an optimist, or a realist?
What are your partner's worst and best personality characteristics?
What is your partner's most annoying habit?
What is your partner most proud about?
What's something that makes your partner cry?
Who is more disciplined?
If you could change anything about your partner, what would it be?
What is the biggest way that your partner wastes money?
How does your partner tell you that they're in the mood?
Who's better in bed?
Who is the dominating partner in the bedroom?
When is your partner the most appealing to you?
Where is the strangest place you have made love?
What do you find most physically attractive about your partner?
What was your first fight and what was it about?
What is your first memory of your partner?
How would you describe your partner on your first date?
Who said "I love you" first?
What's your official dating anniversary?
When did you first say "I love you"?
Who of their friends is your partner most similar to?
What is your partner's favorite emoji?
What does your partner talk about the most?
What's your partner's favorite joke to tell?
What is your partner's favorite bonding activity?
What is a sure-fire way to get on your partner's nerves?
Out of the two of you, who is more decisive?
What's one thing you will never, ever agree on?
Which one of you is the biggest procrastinator?
Who is the more romantic one in your relationship?
Who made the first move?
When did you first want to kiss your partner?
Who is more jealous, you or your partner?
Who initiates sex more often, you or your partner?
Who is more likely to get emotional during an argument?
Who is more likely to give in during an argument?
Who is more likely to forget important dates?
Do you know what your partner's biggest insecurity is?
Are you comfortable with your partner seeing you naked?
What are your partner's turn-ons?
If you could read all your partner's texts with others, would you?
Do you prefer rough or romantic?
What do you find irresistible about your partner?
How and when did you know you'd make it as a couple?
What are three strengths you see that you possess as a team?
How did you know you wanted to be with your partner? Did it happen in a moment or over time?
How does your partner make you feel especially loved in your relationship?
What's your favorite intimate memory together? Or top three memories?
What about your relationship makes you really happy?
What's your biggest fear for this relationship?
What's one difference between you and your partner that you absolutely love?
What's one similarity between you and your partner that you absolutely love?
Where is your favorite place to be with your partner?
What's one thing you're scared to ask your partner, but really want to know the answer to?
What's one thing you feel your relationship is lacking?
If your relationship ended, what's the one thing about it you'd miss the most?
Can you change your whole self just for your partner?
Does your partner want to know anything about your past relationships?
What does a balanced relationship look like to you?
Do you think you had a great first kiss or was it mediocre?
In what ways have you changed since you first met?
What's the best compliment your partner has ever given you?
What's your favorite thing about <insert name>'s appearance?
What celebrity would you let your partner cheat on you with?
Do you care if your partner watches porn?
What's something you would want your partner to find out on the first date about yourself that they would certainly find out later?
What were your parents 100% right about? Didn't feel like it then, but you see it now.
What's one thing you would delete in this world?
Which body part is fully grown from birth?
What's an insult you would never forget?
If you could commit a crime but the crime you commit could never be committed again, what crime would you commit?
What's the craziest thing you ever did to get a girl/guy to like you?
What's the first thing you would do if you were the opposite sex for a day?
If you had a minute to say something to the entire world, what would you say?
What's the worst day you have ever had?
What's the most disrespectful thing somebody has ever done to you?
What's the worst purchase you have ever made?
If you could replace a war with any other physical activity, what would it be?
What's something that's good but you can't say out loud?
What's one thing you're addicted to?
Would you rather have the ability to grow anything you want or shrink anything you want?
What do you wish you could tell your parents?
What's one thing you're tired of people doing?
If you could make a new law, what would it be?
If you had to replace your parents with any celebrities, who would you pick?
Would you die to stop racism?
`,
};

const cleanLine = (raw) => raw.trim();

const buildRows = () => {
  const rows = [];
  for (const [category, block] of Object.entries(sections)) {
    for (const rawLine of block.split("\n")) {
      const content = cleanLine(rawLine);
      if (!content) continue;
      const playerSpecific = /<insert\s+name\s*>/i.test(content);
      rows.push({ content, category, playerSpecific });
    }
  }
  return rows;
};

const main = async () => {
  const rows = buildRows();
  console.log(`Prepared ${rows.length} questions.`);

  await prisma.questions.deleteMany();
  const result = await prisma.questions.createMany({ data: rows });
  console.log(`Inserted ${result.count} rows.`);

  const perCategory = await prisma.questions.groupBy({
    by: ["category"],
    _count: { _all: true },
  });
  for (const row of perCategory) {
    console.log(`  ${row.category}: ${row._count._all}`);
  }
};

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
