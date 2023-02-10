package repositories

import (
	"housy/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransaction() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	CreateTransaction(Transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, ID string) error
	DeleteTransaction(Transaction models.Transaction) (models.Transaction, error)
	
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("House").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("House").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("House").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}
func (r *repository) UpdateTransaction(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("House").Preload("User").First(&transaction, ID) // 112233
	transaction.StatusPayment = status
	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}
