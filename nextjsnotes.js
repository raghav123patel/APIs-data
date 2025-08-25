Skip to content
You said:
getStaticprops and getserversideprops full explanation in nextjs in detail in hindi
ChatGPT said:
Next.js में getStaticProps और getServerSideProps दो बहुत ही महत्वपूर्ण Data Fetching methods हैं जो पेज-लेवल पर उपयोग की जाती हैं। ये दोनों Functions Next.js में pre-rendering (Static Generation और Server-side Rendering) को control करने के लिए इस्तेमाल होते हैं।

चलो एक-एक करके दोनों को detail में समझते हैं — हिंदी में, उदाहरणों के साथ।

🔹 1. getStaticProps — Static Generation के लिए
📌 उद्देश्य:
getStaticProps का उपयोग तब किया जाता है जब आप पेज को build time पर generate करना चाहते हैं, यानी कि पेज static HTML में बदलकर पहले से generate हो जाता है। ये पेज fast होते हैं और CDN से serve किए जा सकते हैं।

✅ उपयोग कब करें?
जब डेटा बार-बार नहीं बदलता।

ब्लॉग पोस्ट्स, मार्केटिंग पेज, FAQs आदि जैसे पेज के लिए।

अगर आप चाहते हैं कि पेज एक बार बने और फिर वही serve हो जब तक rebuild ना हो।

📘 Syntax:
export async function getStaticProps(context) {
  // API से data fetch करो या किसी database से
  const res = await fetch('https://api.example.com/posts');
  const data = await res.json();

  return {
    props: {
      posts: data, // ये props component को मिलते हैं
    },
    revalidate: 10, // ISR (optional): हर 10 सेकंड में background में re-generate होगा
  };
}
🧠 Notes:
getStaticProps सिर्फ पेज level पर ही काम करता है (pages/ फोल्डर में)।

आप इसमें context parameters भी access कर सकते हैं: params, locale, preview, etc.

इसमें कोई request object (req, res) नहीं होता।

🧪 Example:
// pages/blog.js
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }) {
  return (
    <div>
      <h1>ब्लॉग पोस्ट्स</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
🔹 2. getServerSideProps — Server-side Rendering के लिए
📌 उद्देश्य:
getServerSideProps का उपयोग तब होता है जब आप चाहते हैं कि हर request पर डेटा fetch हो और पेज को उसी समय render किया जाए।

✅ उपयोग कब करें?
जब डेटा हर बार बदल सकता है (live data)।

जब डेटा user-specific है (जैसे authentication या user profile)।

SEO की ज़रूरत है लेकिन डेटा dynamic है।

📘 Syntax:
export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
🧠 Notes:
हर request पर यह function server पर run होता है।

आप context में request (req) और response (res) को access कर सकते हैं।

Slower than getStaticProps क्योंकि ये हर बार server पर चलता है।

🧪 Example:
// pages/user.js
export async function getServerSideProps(context) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}

export default function UserPage({ users }) {
  return (
    <div>
      <h1>यूज़र्स</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
⚖️ getStaticProps vs getServerSideProps — तुलना
Property	getStaticProps	getServerSideProps
रन कब होता है?	Build time पर	हर request पर
परफॉरमेंस	तेज़ (CDN से)	धीमा (server से)
यूज़ कब करें?	कम बदलने वाला डेटा	Frequently changing डेटा
SEO Friendly?	हां	हां
Revalidation संभव?	हां (revalidate)	नहीं (हर बार नया render)
🔚 निष्कर्ष:
अगर आपका डेटा...	तो उपयोग करें...
स्थिर है और बार-बार नहीं बदलता	getStaticProps
हर request पर बदलता है	getServerSideProps
अगर तुम चाहो, तो मैं एक demo project structure या दोनों methods के साथ एक छोटा सा Next.js प्रोजेक्ट भी बना सकता हूँ।

बताओ, क्या वह भी चाहिए?

You said:
ha
ChatGPT said:

Answer in chat instead
तुम्हें एक छोटा सा Next.js प्रोजेक्ट structure दिखाने के लिए मैं एक demo तैयार कर सकता हूँ, लेकिन इसके लिए पहले तुम्हें ChatGPT में लॉग इन करना होगा, ताकि हम Canvas फीचर का इस्तेमाल कर सकें। इससे मैं तुम्हारे लिए पूरा प्रोजेक्ट code एक organized फॉर्म में बना पाऊँ।

लॉग इन करने के बाद दोबारा बताओ — मैं तुरंत शुरू कर दूँगा।

अगर meanwhile तुम्हें एक basic demo code structure चाहिए, तो मैं यहां भी बता सकता हूँ। बताओ कैसे करना है?



Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

