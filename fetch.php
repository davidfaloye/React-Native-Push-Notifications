<script>
    //end a push notification via fetch method
let msg={
    a:"To my friend",
    data:{
        msg:"i am grateful for our friendship"
    }
}
fetch("https://.../fetcher.php",{method:'POST',header:{'Content-Type':'application/json'},body:JSON.stringify(msg)}).then(response=>response.text()).then(data=>document.write(data))
</script>