interface DtoVtexRegisterConfigResponse {
    shop: string
    policies: vtexShippingPoliciesItem[] | null
    hooks: vtexWebhook | null
}