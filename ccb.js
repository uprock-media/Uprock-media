

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.custom-code').forEach(element => {
        let code = element.textContent.replace(/\u00a0/g, ' ').trim();
        if (!code) return;

        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = code;

        // Добавляем <script> в body
        tempDiv.querySelectorAll("script").forEach(oldScript => {
            let newScript = document.createElement("script");
            if (oldScript.src) {
                newScript.src = oldScript.src;
                newScript.async = true;
            } else {
                newScript.textContent = oldScript.textContent;
            }
            document.body.appendChild(newScript);
        });

        // Добавляем <style> в head
        tempDiv.querySelectorAll("style").forEach(oldStyle => {
            let newStyle = document.createElement("style");
            newStyle.textContent = oldStyle.textContent;
            document.head.appendChild(newStyle);
        });

        // Заменяем <noscript> на скрытый <div>
        tempDiv.querySelectorAll("noscript").forEach(oldNoscript => {
            let hiddenDiv = document.createElement("div");
            hiddenDiv.className = "hidden-noscript";
            hiddenDiv.innerHTML = oldNoscript.innerHTML; // Копируем содержимое
            tempDiv.replaceChild(hiddenDiv, oldNoscript);
        });

        // Вставляем оставшийся HTML без <script> и <style>
        tempDiv.querySelectorAll("script, style").forEach(el => el.remove());
        if (tempDiv.innerHTML.trim()) {
            element.replaceWith(tempDiv);
        }

        // Удаляем сам элемент .custom-code после генерации кода
        element.remove();
    });

    // Скрываем все <div class="hidden-noscript">
    setTimeout(() => {
        document.querySelectorAll('.hidden-noscript').forEach(div => {
            div.style.display = "none";
        });
    }, 100);
});

