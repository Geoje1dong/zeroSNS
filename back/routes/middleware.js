exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){  //
    next(); //next가 없음 그냥 실행이 끝남
  } else{
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){  //
    next(); //next가 없음 그냥 실행이 끝남
  } else{
    res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
  }
};