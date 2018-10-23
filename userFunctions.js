// 사용자를 인증하는 함수 : 아이디로 먼저 찾고 비밀번호를 그 다음에 비교하도록 함
var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨 : ' + id + ', ' + password);

    // 1. 아이디를 이용해 검색
    UserModel.findById(id, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log('아이디 [%s]로 사용자 검색결과', id);
        console.dir(results);

        if (results.length > 0) {
            console.log('아이디와 일치하는 사용자 찾음.');

            // 2. 패스워드 확인 : 모델 인스턴스를 객체를 만들고 authenticate() 메소드 호출
            var user = new UserModel({id:id});
            var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
            if (authenticated) {
                console.log('비밀번호 일치함');
                callback(null, results);
            } else {
                console.log('비밀번호 일치하지 않음');
                callback(null, null);
            }

        } else {
            console.log("아이디와 일치하는 사용자를 찾지 못함.");
            callback(null, null);
        }

    });

}


//사용자를 추가하는 함수
var addUser = function(database, id, password, name, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

    // UserModel 인스턴스 생성
    var user = new UserModel({"id":id, "password":password, "name":name});

    // save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
    user.save(function(err, addedUser) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log("사용자 데이터 추가함.");
        callback(null, addedUser);

    });
}

module.exports = {
  
}
