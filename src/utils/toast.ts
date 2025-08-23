export function showToast(message: string) {
    const toast = document.getElementById("toast");
    if (!toast) return;
  
    toast.textContent = message;
    toast.classList.remove("opacity-0", "translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");
  
    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4");
    }, 2000);
  }
  