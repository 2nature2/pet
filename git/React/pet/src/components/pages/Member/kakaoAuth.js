const CLIENT_ID = '3ae61230f41dcde5aeadc39ea01ad8db'
const REDIRECT_URI =
  'http://localhost:3000/user/kakao/callback'

export const KAKAO_AUTH_URL = 
  `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`