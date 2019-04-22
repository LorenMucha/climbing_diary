const TableController = require("../controller/TableController");

class Table extends TableController{
    create(){
        climbing_taskRepo.getTableData(climbing_view.getFilter())
            .then((data)=> {
                //todo noch durch sql ersetzen -> siehe android projekt
                let header = function () {
                        let thead = '<thead><tr><th scope="col">Grad</th>';
                        $.each(Styles.getStyles(), function (key, val) {
                            thead += ` <th scope="col">${val.toUpperCase()}</th>`;
                        });
                        return `${thead}<th>Gesamt</th></thead>`;
                    },
                    body = function () {
                        let tbody = `<tbody>`;
                        $.each(data, function (key, val) {
                            let grade = Object.keys(val)[0];
                            tbody += `<tr style="background-color: ${Colors.getGradeColor(val.level)}; color:white;">
                                <td>${val.level}</td>
                                <td>${val.OS}</td>
                                <td>${val.RP}</td>
                                <td>${val.FLASH}</td>
                                <td>${val.Gesamt}</td>
                              </tr>`;
                        });
                        return `${tbody}</tbody>`
                    },
                    html = `
                <table class="table table-striped">
                     ${header()}
                     ${body()}
                </table>
            `;
                $(`${this.id}`).html(html);
                body();
            });
    }
}
module.exports=Table;