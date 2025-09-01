Skip to content
You said:
data passing in react from parent to child along with the full details and explanation in hindi in reactjs
ChatGPT said:
ReactJS में parent से child component को data pass करना एक बहुत ही common और important concept है। इस प्रक्रिया को props (properties) के माध्यम से किया जाता है।

🔷 Parent से Child में Data Pass करना — ReactJS में (हिंदी में पूरी जानकारी)
✅ Step-by-Step समझाइए:
🧩 1. Props क्या होता है?
React में, props एक object होता है जो एक component से दूसरे component को data भेजने के लिए use किया जाता है। खासकर, जब एक parent component अपने किसी child component को data देना चाहता है, तब props use होता है।

🛠️ Example (उदाहरण):
मान लीजिए हमारे पास दो component हैं:

ParentComponent

ChildComponent

अब हम parent से child को एक message भेजते हैं।

📁 Code:
// ChildComponent.js
import React from 'react';

function ChildComponent(props) {
  return (
    <div>
      <h2>Child Component</h2>
      <p>Parent से मिला Message: {props.message}</p>
    </div>
  );
}

export default ChildComponent;
// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const message = "नमस्ते, मैं Parent से आया हूँ!";

  return (
    <div>
      <h1>Parent Component</h1>
      {/* Props के ज़रिए data भेजा */}
      <ChildComponent message={message} />
    </div>
  );
}

export default ParentComponent;
🔍 पूरा विवरण (Explanation in Hindi):
क्रम	विषय	विवरण
1️⃣	Parent Component	ParentComponent में एक variable (message) है जिसे हम child को भेजना चाहते हैं।
2️⃣	Child Component	ChildComponent props को parameter की तरह लेता है और फिर उसे render करता है।
3️⃣	Data Transfer	<ChildComponent message={message} /> — यह वह जगह है जहां parent ने child को data भेजा।
4️⃣	props.message	ChildComponent में props.message के ज़रिए उस data को access किया जाता है।
⚠️ Important बातें:
Props read-only होते हैं। आप child component में props को change नहीं कर सकते।

Props JavaScript objects होते हैं।

Multiple props भी भेज सकते हैं जैसे:

<ChildComponent name="Amit" age={25} isStudent={true} />
✅ Reusable Components बनाने में मदद
Props की मदद से आप components को dynamic और reusable बना सकते हैं।

📌 Bonus Tip: Destructuring
ChildComponent में आप props को destructure भी कर सकते हैं:

function ChildComponent({ message }) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
✨ निष्कर्ष (Conclusion):
React में parent से child को data pass करने के लिए props का उपयोग किया जाता है।

यह एक one-way data flow है — यानी सिर्फ parent से child में data जाता है।

Props component को dynamic और reusable बनाते हैं।

अगर आप चाहें तो मैं एक live CodeSandbox लिंक या interactive playground भी बना सकता हूँ, जिससे आप इसे तुरंत चला सकें।

कोई और advanced topic (जैसे props drilling, useContext, etc.) जानना हो तो बताइए।




Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

