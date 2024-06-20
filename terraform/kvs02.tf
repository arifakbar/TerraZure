resource "azurerm_key_vault" "kvs02" {
  name                        = "kvs02"
  resource_group_name         = "rg-02"
  location                    = "australiaeast"
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  enabled_for_disk_encryption = "false"
  soft_delete_retention_days  = "7"
  purge_protection_enabled    = "false"
  sku_name                    = "standard"
  enable_rbac_authorization   = "false"
}
