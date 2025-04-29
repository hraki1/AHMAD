import React from "react";

const SizeChart = () => {
  return (
    <div className="pt-5">
      <div className="tabs-ac-style d-md-none main-title-2" id="size-chart">
        Size Chart
      </div>
      <div id="size-chart" className="tab-content">
        <div className="mb-2 main-title-2">Ready to Wear Clothing</div>
        <div className="mb-4 desc-content">
          This is a standardised guide to give you an idea of what size you will
          need, however some brands may vary from these conversions.
        </div>
        <div className="size-chart-tbl table-responsive px-1">
          <table className="table-bordered align-middle mb-0">
            <thead>
              <tr>
                <th>Size</th>
                <th>XXS - XS</th>
                <th>XS - S</th>
                <th>S - M</th>
                <th>M - L</th>
                <th>L - XL</th>
                <th>XL - XXL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>UK</th>
                <td>6</td>
                <td>8</td>
                <td>10</td>
                <td>12</td>
                <td>14</td>
                <td>16</td>
              </tr>
              <tr>
                <th>US</th>
                <td>2</td>
                <td>4</td>
                <td>6</td>
                <td>8</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <th>Italy (IT)</th>
                <td>38</td>
                <td>40</td>
                <td>42</td>
                <td>44</td>
                <td>46</td>
                <td>48</td>
              </tr>
              <tr>
                <th>France (FR/EU)</th>
                <td>34</td>
                <td>36</td>
                <td>38</td>
                <td>40</td>
                <td>42</td>
                <td>44</td>
              </tr>
              <tr>
                <th>Denmark</th>
                <td>32</td>
                <td>34</td>
                <td>36</td>
                <td>38</td>
                <td>40</td>
                <td>42</td>
              </tr>
              <tr>
                <th>Russia</th>
                <td>40</td>
                <td>42</td>
                <td>44</td>
                <td>46</td>
                <td>48</td>
                <td>50</td>
              </tr>
              <tr>
                <th>Germany</th>
                <td>32</td>
                <td>34</td>
                <td>36</td>
                <td>38</td>
                <td>40</td>
                <td>42</td>
              </tr>
              <tr>
                <th>Japan</th>
                <td>5</td>
                <td>7</td>
                <td>9</td>
                <td>11</td>
                <td>13</td>
                <td>15</td>
              </tr>
              <tr>
                <th>Australia</th>
                <td>6</td>
                <td>8</td>
                <td>10</td>
                <td>12</td>
                <td>14</td>
                <td>16</td>
              </tr>
              <tr>
                <th>Korea</th>
                <td>33</td>
                <td>44</td>
                <td>55</td>
                <td>66</td>
                <td>77</td>
                <td>88</td>
              </tr>
              <tr>
                <th>China</th>
                <td>160/84</td>
                <td>165/86</td>
                <td>170/88</td>
                <td>175/90</td>
                <td>180/92</td>
                <td>185/94</td>
              </tr>
              <tr>
                <th>Jeans</th>
                <td>24-25</td>
                <td>26-27</td>
                <td>27-28</td>
                <td>29-30</td>
                <td>31-32</td>
                <td>32-33</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
