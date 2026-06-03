console.log('🚀 Starting Stage 1...');

const YOUR_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2NzZTE4OEBjZ2poYW5qZXJpaS5pbiIsImV4cCI6MTc4MDQ3NzQxOSwiaWF0IjoxNzgwNDc2NTE5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGI3NWYzZGEtMTAyMC00YTVmLTk4YWUtYWQwMGY3NGZiOTllIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ3VuZ3VuIiwic3ViIjoiODY5ZWY0MjktMzEzZC00Y2FkLWIwYjktNjgwYTVlMzBlN2NhIn0sImVtYWlsIjoiMjNjc2UxODhAY2dqaGFuamVyaWkuaW4iLCJuYW1lIjoiZ3VuZ3VuIiwicm9sbE5vIjoiMjMzMDEwNyIsImFjY2Vzc0NvZGUiOiJud3dzS3giLCJjbGllbnRJRCI6Ijg2OWVmNDI5LTMxM2QtNGNhZC1iMGI5LTY4MGE1ZTMwZTdjYSIsImNsaWVudFNlY3JldCI6IlFoRllZa2tGdm1XYURheGUifQ.K5r7gUswDES0JakNSWjMmQ8eRASTUtNoWoMrjtCefMw";

const TYPE_WEIGHTS = { 'Placement': 3, 'Result': 2, 'Event': 1 };

function calculateScore(notif) {
  const weight = TYPE_WEIGHTS[notif.Type] || 0;
  const timestamp = new Date(notif.Timestamp);
  const now = new Date();
  const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
  const recencyScore = Math.max(0, 100 - hoursDiff);
  return (weight * 30) + (recencyScore * 0.3);
}

async function main() {
  console.log('\n🏆 TOP 10 PRIORITY NOTIFICATIONS\n');
  console.log('='.repeat(60));
  
  try {
    console.log('📡 Fetching notifications from API...');
    
    const response = await fetch('http://4.224.186.213/evaluation-service/notifications', {
      headers: { 'Authorization': `Bearer ${YOUR_TOKEN}` }
    });
    
    if (!response.ok) {
      console.error('❌ API Error:', response.status);
      return;
    }
    
    const data = await response.json();
    console.log(`✅ Fetched ${data.notifications.length} notifications\n`);
    
    const sorted = [...data.notifications].sort((a, b) => calculateScore(b) - calculateScore(a));
    const top10 = sorted.slice(0, 10);
    
    top10.forEach((notif, i) => {
      const emoji = notif.Type === 'Placement' ? '🔴' : notif.Type === 'Result' ? '🟡' : '🟢';
      console.log(`${i+1}. ${emoji} [${notif.Type}] ${notif.Message}`);
      console.log(`   📅 ${notif.Timestamp}`);
      console.log(`   📊 Score: ${calculateScore(notif).toFixed(2)}\n`);
    });
    
    console.log('='.repeat(60));
    console.log(`✅ Displayed top ${top10.length} priority notifications\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();