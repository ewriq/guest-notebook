$apiUrl = "https://guest-notebook.onrender.com/add" 

$data = @{
    id = "deger1"  
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

$response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $data -Headers $headers
$response