export const setStorage = (key, value) => {
  const now = new Date()
  now.setDate(now.getDate() + 1); // 有効期限は1日に設定
  const expiredAt = parseInt((now.getTime())/1000, 10);
  const data = {
    expired: expiredAt,
    value: value
  };
  localStorage.setItem(key, JSON.stringify(data));
}
 
export const getStorage = (key) => {
  let s = localStorage.getItem(key);
  if (!s) {
    return s;
  }
  s = JSON.parse(s);
  const now = parseInt((new Date().getTime())/1000, 10);
  if (s.expired > now) {
    return s.value;
  } else {
    localStorage.removeItem(key);
    return null;
  }
}

export const removeStorage = (key) => {
  localStorage.removeItem(key);
}
