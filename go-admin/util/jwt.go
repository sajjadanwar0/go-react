package util

import (
	"github.com/golang-jwt/jwt/v4"
	"time"
)

const SecretKey = "secret"

type MyCustomClaims struct {
	jwt.RegisteredClaims
}

func GenerateJwt(issuer string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["iss"] = issuer
	claims["exp"] = jwt.NewNumericDate(time.Now().Add(time.Hour * 24))
	return token.SignedString([]byte(SecretKey))
}

func ParseJwt(cookie string) (string, error) {

	token, err := jwt.ParseWithClaims(cookie, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil || !token.Valid {
		return "", err
	}
	claims := token.Claims.(*MyCustomClaims)
	return claims.Issuer, nil
}
