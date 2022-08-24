package middlewares

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"go-admin/database"
	"go-admin/models"
	"go-admin/util"
	"strconv"
)

func IsAuthorized(c *fiber.Ctx, page string) error {
	cookie := c.Cookies("jwt")
	id, err := util.ParseJwt(cookie)
	if err != nil {
		return err
	}
	userId, _ := strconv.Atoi(id)
	user := models.User{
		Id: uint(userId),
	}
	database.DB.Preload("Role").Find(&user)
	role := models.Role{
		Id: user.RoleId,
	}
	database.DB.Preload("Permissions").Find(&role)
	if c.Method() == "GET" {
		for _, permission := range role.Permissions {
			if permission.Name == "view_"+page || permission.Name == "edit_"+page {
				return nil
			}
		}
	} else {
		for _, permission := range role.Permissions {
			if permission.Name == "edit_"+page {
				return nil
			}
		}
	}
	c.Status(fiber.StatusUnauthorized)
	return errors.New("unauthorized")
}
