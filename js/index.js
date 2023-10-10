addEventListener('DOMContentLoaded',function(){
    const userlist=document.getElementById('user-list')
    const githubForm=document.getElementById('github-form')
    const reposList=document.getElementById('repos-list')

    githubForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        userlist.innerHTML=''
        reposList.innerHTML=''
        const searchInput=document.getElementById('search').value
        fetch(`https://api.github.com/search/users?q=${searchInput}`)
        .then(response=>response.json())
        .then(userData=>{
            userData.items.forEach(UserDatum => {
                let loginName=UserDatum.login
                const resultName=document.createElement('li')
                resultName.textContent=loginName
                resultName.addEventListener('click',()=>{
                    reposList.innerHTML=''
                    fetch(`https://api.github.com/users/${loginName}/repos`)
                    .then(reposResults=>reposResults.json())
                    .then(reposData=>{
                        reposData.forEach(reposDatum=>{
                            const outputRepos=document.createElement('li')
                            outputRepos.textContent=reposDatum.name
                            reposList.appendChild(outputRepos)

                        })
                    })
                })
                userlist.appendChild(resultName)
                
            });

        })
    })
    
})


