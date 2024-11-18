const postLogin = async (e) => {
    e.preventDefault();

    const email = e.target.children[2].value;
    const password = e.target.children[4].value;

    const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "content-type": "application/json" },
        credentials: "include",
    });

    const data = await res.json();

    if (data.admin) {
        alert("Admin logged in!");
        dispatch({ type: "admin-login", payload: data.admin });
        router.push("/admin"); // Weiterleitung zur Admin-Seite
        return;
    }

    if (data.success) {
        dispatch({ type: "users-login", payload: data.searchedUser });
        router.push("/"); // Weiterleitung zur Benutzer-Seite
        return;
    }

    alert(data.message || "Login failed");
};
