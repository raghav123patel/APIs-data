Skip to content
You said:
give the example of server and client component in nextjs with its implementation and explanation full details in hindi
ChatGPT said:
Next.js में Server और Client Components को अलग-अलग प्रकार की rendering behavior को संभालने के लिए उपयोग किया जाता है। यह Next.js 13 और उसके बाद के संस्करणों में App Router के साथ introduce किया गया था। आइए हम इसे विस्तार से हिंदी में समझते हैं, और एक-एक करके Server Component और Client Component के उदाहरण और उनका implementation देखें।

🧠 Server और Client Component क्या होते हैं?
🔹 विशेषता	🔹 Server Component	🔹 Client Component
कहां render होता है	Server पर	Client (Browser) पर
JavaScript भेजता है?	❌ नहीं	✅ हां
उपयोग	Data Fetching, SEO-friendly pages	Interactivity, Event handling
Hooks support	✅ Server-only hooks (जैसे fetch)	✅ Client-only hooks (जैसे useState, useEffect)
✅ 1. Server Component का उदाहरण
लक्षण:

Default रूप से Next.js के सभी components Server Components होते हैं जब तक कि हम उन्हें explicitly "use client" नहीं लिखते।

📂 फ़ोल्डर संरचना:
app/
  └── page.tsx
  └── components/
         └── ServerComponent.tsx
📄 components/ServerComponent.tsx
// ServerComponent.tsx (कोई 'use client' नहीं है इसलिए यह Server Component है)
import React from 'react';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();
  return data;
}

const ServerComponent = async () => {
  const data = await getData();

  return (
    <div>
      <h2>यह एक Server Component है</h2>
      <p>Title: {data.title}</p>
      <p>Body: {data.body}</p>
    </div>
  );
};

export default ServerComponent;
📄 app/page.tsx
import ServerComponent from './components/ServerComponent';

export default function HomePage() {
  return (
    <main>
      <h1>मुख्य पृष्ठ</h1>
      <ServerComponent />
    </main>
  );
}
🧾 Explanation (व्याख्या):
ServerComponent.tsx में कोई "use client" directive नहीं है, इसलिए यह server पर ही render होता है।

इसमें हमने async data fetching (fetch) की जो केवल server पर संभव है।

यह SEO के लिए अच्छा है क्योंकि HTML server से pre-render हो कर आता है।

✅ 2. Client Component का उदाहरण
लक्षण:

"use client" directive सबसे ऊपर जरूरी है।

इसमें browser-specific logic जैसे कि state management (useState) या event handling होता है।

📄 components/ClientComponent.tsx
'use client';

import React, { useState } from 'react';

const ClientComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>यह एक Client Component है</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>बढ़ाएं</button>
    </div>
  );
};

export default ClientComponent;
📄 app/page.tsx (same file, both components use)
import ServerComponent from './components/ServerComponent';
import ClientComponent from './components/ClientComponent';

export default function HomePage() {
  return (
    <main>
      <h1>मुख्य पृष्ठ</h1>
      <ServerComponent />
      <ClientComponent />
    </main>
  );
}
🧾 Explanation (व्याख्या):
"use client" का मतलब है कि यह component browser पर render होगा।

इसमें हम useState जैसे React Hooks का उपयोग कर सकते हैं।

यह इंटरएक्टिव होता है जैसे बटन क्लिक इत्यादि।

🔄 Server और Client को मिलाकर उपयोग करना
Client Components को आप Server Components के अंदर इस्तेमाल नहीं कर सकते सीधे, लेकिन आप उन्हें props देकर communication कर सकते हैं।

❌ गलत तरीका:
// ❌ ServerComponent.jsx में client component को import करना (गलत है)
import ClientComponent from './ClientComponent'; // ERROR देगा
✅ सही तरीका:
ServerComponent को सिर्फ data दिखाने के लिए उपयोग करें।

ClientComponent को event या interaction के लिए उपयोग करें।

📌 निष्कर्ष (Conclusion)
Point	Server Component	Client Component
उपयोग	Static + dynamic data fetching, SEO	UI interaction, animations
प्रदर्शन	तेज़ (no JS in client)	थोड़ा भारी (JS bundle भेजता है)
Hooks	fetch, server-side logic	useState, useEffect, etc
अगर आपको यह structure तैयार करना है:
npx create-next-app@latest my-app --experimental-app
cd my-app
npm run dev
फिर app/ directory में ऊपर के components बनाएं।

अगर आप चाहें तो मैं एक पूरा GitHub-ready उदाहरण या CodeSandbox लिंक भी बना सकता हूँ। बताएं 😊



Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

