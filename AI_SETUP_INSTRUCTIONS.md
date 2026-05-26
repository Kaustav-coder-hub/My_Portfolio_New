# AI Lab Setup Instructions

## Professional AI Assistant with Privacy Protection

Your portfolio now includes a **professional AI assistant** that ONLY discusses your technical work and projects. It has built-in privacy protection to prevent personal information disclosure.

## Features ✨

- **Professional Boundaries**: Only answers questions about projects, skills, and technical work
- **Personal Privacy**: Automatically rejects personal questions (family, relationships, private life)
- **Fallback Responses**: Works offline with smart local responses
- **Real-time Typing Indicator**: Shows when AI is thinking
- **Auto-scroll**: Smooth chat experience

## Setup Options

### Option 1: Use OpenAI API (Recommended for GPT-4)

1. **Get OpenAI API Key**:

   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

2. **Add to Your Project**:

   ```bash
   # Edit .env.local file
   nano .env.local

   # Replace with your actual key:
   VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   ```

3. **Update App.jsx** (line ~190):

   ```javascript
   'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
   ```

4. **Install dotenv** (if needed):

   ```bash
   npm install dotenv
   ```

5. **Restart dev server**:
   ```bash
   npm run dev
   ```

### Option 2: Use Local Fallback (No API Required)

The AI Lab **already works** with smart local responses! It includes:

- Project-specific answers
- Skill information
- Contact details
- Privacy protection

No API key needed for basic functionality.

### Option 3: Use ChatGPT Plus Custom GPT

1. **Create Custom GPT** in ChatGPT Plus:

   - Go to https://chat.openai.com/gpts/editor
   - Create new GPT
   - Name: "Kaustav's Professional Assistant"

2. **Add this instruction**:

   ```
   You are Kaustav Chakraborty's professional portfolio assistant.

   STRICT RULES:
   1. ONLY discuss professional work, projects, skills, technical expertise
   2. NEVER discuss personal life, relationships, family, private matters
   3. If asked personal questions, respond: "I only discuss professional topics"

   PROFILE:
   - ML & Embedded Systems Student at JIS College
   - Specializes in ML, IoT, Computer Vision, Embedded Systems

   PROJECTS:
   1. Deepfake Detection (2024) - 94% accuracy, ConvNeXt/ViT, Flask/Streamlit
   2. TrackBot Railway Detector (2024) - IoT, Raspberry Pi, MQTT
   3. Autonomous Dustbin (2023) - 7-sensor classification, solar-powered
   4. VocalEmotion (2022) - LSTM, 87% accuracy, TensorFlow

   SKILLS: Python, PyTorch, TensorFlow, Embedded C, Node.js, React, Tailwind, Docker

   GitHub: https://github.com/Kaustav-coder-hub/
   LinkedIn: https://www.linkedin.com/in/kaustav-chakraborty-2009292a9/
   ```

3. **Use Custom GPT API** (requires GPT Plus):
   - Similar to Option 1 but with your custom GPT
   - Better privacy control
   - Consistent professional tone

## Privacy Protection 🔒

The AI assistant has **built-in filters** that:

✅ **Allows**:

- Questions about projects
- Technical skills queries
- Technology stack discussions
- Collaboration inquiries
- Contact information

❌ **Blocks**:

- Personal life questions
- Family/relationship queries
- Private information
- Age, birthday, address
- Any non-professional topics

**Example**:

```
User: "What's your girlfriend's name?"
AI: "I can only discuss Kaustav's professional work and technical projects.
     Would you like to know about his projects, skills, or technical expertise?"
```

## Quick Start Prompts

The AI Lab includes 4 quick-start buttons:

- 🎭 **Deepfake**: Learn about the deepfake detection project
- ⚙️ **Tech Stack**: Explore technologies used
- 🤖 **TrackBot**: Railway crack detection system
- 📧 **Contact**: Get professional contact info

## Cost Considerations

### OpenAI API Pricing (GPT-4):

- ~$0.03 per 1K input tokens
- ~$0.06 per 1K output tokens
- Average chat: ~$0.01-0.05 per message

### Cost Control:

```javascript
// In App.jsx, adjust max_tokens for shorter responses:
max_tokens: 150; // Lower = cheaper, faster
```

### Free Alternative:

Use the local fallback (already implemented) - works great for portfolio demo!

## Testing

Test the privacy protection:

```
✅ "Tell me about the Deepfake project" → Works
✅ "What skills does Kaustav have?" → Works
✅ "How can I contact Kaustav?" → Works
❌ "What's your personal life like?" → Blocked
❌ "Tell me about your family" → Blocked
```

## Troubleshooting

**Issue**: API not working

- Check API key in `.env.local`
- Verify billing is enabled on OpenAI
- Check browser console for errors

**Issue**: Fallback always used

- Normal! Fallback works great
- Add API key only if you want GPT-4 power

**Issue**: Personal questions answered

- Check the `professionalContext` system prompt
- Verify filter keywords in fallback logic

## Security Best Practices

1. **Never commit `.env.local`** to Git
2. **Use environment variables** for API keys
3. **Enable rate limiting** in production
4. **Monitor API usage** on OpenAI dashboard
5. **Rotate keys** periodically

## Next Steps

1. Try the AI Lab with local fallback ✓
2. Add OpenAI API key (optional)
3. Customize responses in `sendMessage` function
4. Deploy with environment variables

---

**Questions?** Check the code in `App.jsx` line ~170-250 for the AI logic!
