class Share {
  projectDisplay(id) {
    this.id = id;
    projectDisplay(id);
    colorControl("share");
    const project_cont_html = `
        <div class="donate">
            <div id="join">
                <button class="new-some button-white-indigo font donateBtn" style="font-size: large;">
                <i class="fa fa-facebook" style="color: rgb(68, 11, 11); padding: 0; margin: 0; width: 30px; margin-right: 6px;"></i>
                Share On Facebook</button>
            </div>
            <div id="join">
                <button class="new-some button-white-indigo font donateBtn" style="font-size: large;">
                <i class="fa fa-twitter" style="color: rgb(68, 11, 11); padding: 0; margin: 0; width: 30px; margin-right: 6px;"></i>
                Share On Twitter</button>
            </div>
        </div>
    `;
    currProjContainerRemove();
    document.querySelector(
      "div.project-container"
    ).innerHTML = project_cont_html;
  }
}
