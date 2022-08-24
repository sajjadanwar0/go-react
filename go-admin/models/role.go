package models

import "gorm.io/gorm"

type Role struct {
	Id          uint         `json:"id"`
	Name        string       `json:"name"`
	Permissions []Permission `json:"permissions" gorm:"many2many:role_permissions"`
}

func (role *Role) Count(db *gorm.DB) int64 {
	var total int64

	db.Model(&Role{}).Count(&total)
	return total
}

func (role *Role) Take(db *gorm.DB, limit int, offset int) interface{} {
	var roles []Role
	db.Offset(offset).Limit(limit).Find(&roles)
	return roles
}
