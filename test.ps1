$apiUrl = "http://localhost:3000/add" 

$data = @{
    id = "deger1"  
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

$response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $data -Headers $headers
$response